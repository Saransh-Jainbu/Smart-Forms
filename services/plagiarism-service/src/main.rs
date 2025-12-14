use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use rayon::prelude::*;
use unicode_segmentation::UnicodeSegmentation;

mod tfidf;
mod similarity;

use tfidf::TfIdfCalculator;
use similarity::cosine_similarity;

#[derive(Debug, Serialize, Deserialize)]
struct AnalyzeRequest {
    submission_id: String,
    text: String,
    compare_with: Option<Vec<CompareText>>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CompareText {
    id: String,
    text: String,
}

#[derive(Debug, Serialize)]
struct PlagiarismResult {
    submission_id: String,
    similarity_score: f64,
    is_plagiarized: bool,
    matches: Vec<Match>,
    processing_time_ms: u128,
}

#[derive(Debug, Serialize)]
struct Match {
    matched_id: String,
    similarity_percentage: f64,
    matched_phrases: Vec<String>,
}

#[derive(Debug, Serialize)]
struct HealthResponse {
    status: String,
    service: String,
}

/// Health check endpoint
async fn health() -> impl Responder {
    HttpResponse::Ok().json(HealthResponse {
        status: "healthy".to_string(),
        service: "plagiarism-service".to_string(),
    })
}

/// Analyze text for plagiarism
async fn analyze_plagiarism(req: web::Json<AnalyzeRequest>) -> impl Responder {
    let start_time = std::time::Instant::now();
    
    log::info!("Analyzing submission: {}", req.submission_id);

    // If no comparison texts provided, return early
    if req.compare_with.is_none() || req.compare_with.as_ref().unwrap().is_empty() {
        return HttpResponse::Ok().json(PlagiarismResult {
            submission_id: req.submission_id.clone(),
            similarity_score: 0.0,
            is_plagiarized: false,
            matches: vec![],
            processing_time_ms: start_time.elapsed().as_millis(),
        });
    }

    let compare_texts = req.compare_with.as_ref().unwrap();

    // Calculate TF-IDF vectors in parallel
    let calculator = TfIdfCalculator::new();
    let main_vector = calculator.calculate(&req.text);

    // Compare with all other submissions in parallel
    let matches: Vec<Match> = compare_texts
        .par_iter()
        .map(|compare| {
            let compare_vector = calculator.calculate(&compare.text);
            let similarity = cosine_similarity(&main_vector, &compare_vector);
            
            // Find matching phrases (simple n-gram matching)
            let matched_phrases = find_matching_phrases(&req.text, &compare.text);

            Match {
                matched_id: compare.id.clone(),
                similarity_percentage: similarity * 100.0,
                matched_phrases,
            }
        })
        .filter(|m| m.similarity_percentage > 10.0) // Only include significant matches
        .collect();

    // Calculate overall similarity score (highest match)
    let max_similarity = matches
        .iter()
        .map(|m| m.similarity_percentage)
        .fold(0.0, f64::max);

    let is_plagiarized = max_similarity > 70.0; // Threshold for plagiarism

    let processing_time = start_time.elapsed().as_millis();
    log::info!(
        "Analysis complete for {}: similarity={:.2}%, plagiarized={}, time={}ms",
        req.submission_id,
        max_similarity,
        is_plagiarized,
        processing_time
    );

    HttpResponse::Ok().json(PlagiarismResult {
        submission_id: req.submission_id.clone(),
        similarity_score: max_similarity,
        is_plagiarized,
        matches,
        processing_time_ms: processing_time,
    })
}

/// Find matching phrases between two texts (simple n-gram approach)
fn find_matching_phrases(text1: &str, text2: &str) -> Vec<String> {
    let words1: Vec<&str> = text1.unicode_words().collect();
    let words2: Vec<&str> = text2.unicode_words().collect();
    
    let mut matches = Vec::new();
    let n = 5; // 5-gram matching

    for i in 0..words1.len().saturating_sub(n) {
        let phrase1 = words1[i..i + n].join(" ");
        
        for j in 0..words2.len().saturating_sub(n) {
            let phrase2 = words2[j..j + n].join(" ");
            
            if phrase1.to_lowercase() == phrase2.to_lowercase() {
                matches.push(phrase1.clone());
                break;
            }
        }
    }

    matches.truncate(10); // Limit to top 10 matches
    matches
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize logger
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let port = std::env::var("PORT").unwrap_or_else(|_| "8002".to_string());
    let bind_address = format!("0.0.0.0:{}", port);

    log::info!("🚀 Plagiarism Service starting on {}", bind_address);

    HttpServer::new(|| {
        App::new()
            .route("/health", web::get().to(health))
            .route("/analyze", web::post().to(analyze_plagiarism))
    })
    .bind(&bind_address)?
    .run()
    .await
}
