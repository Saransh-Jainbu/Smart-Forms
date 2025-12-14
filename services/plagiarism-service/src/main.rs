use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

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

    // Simple word-based similarity (basic implementation)
    let main_words: Vec<&str> = req.text.split_whitespace().collect();
    
    let mut matches: Vec<Match> = vec![];
    
    for compare in compare_texts {
        let compare_words: Vec<&str> = compare.text.split_whitespace().collect();
        
        // Calculate simple word overlap
        let common_words: usize = main_words.iter()
            .filter(|w| compare_words.contains(w))
            .count();
        
        let similarity = if main_words.len() > 0 {
            (common_words as f64 / main_words.len() as f64) * 100.0
        } else {
            0.0
        };

        if similarity > 10.0 {
            matches.push(Match {
                matched_id: compare.id.clone(),
                similarity_percentage: similarity,
                matched_phrases: vec![],
            });
        }
    }

    // Calculate overall similarity score (highest match)
    let max_similarity = matches
        .iter()
        .map(|m| m.similarity_percentage)
        .fold(0.0, f64::max);

    let is_plagiarized = max_similarity > 70.0;

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
