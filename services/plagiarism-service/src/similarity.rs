use std::collections::HashMap;

/// Calculate cosine similarity between two TF-IDF vectors
pub fn cosine_similarity(vec1: &HashMap<String, f64>, vec2: &HashMap<String, f64>) -> f64 {
    let mut dot_product = 0.0;
    let mut magnitude1 = 0.0;
    let mut magnitude2 = 0.0;

    // Calculate dot product and magnitude of vec1
    for (term, &freq1) in vec1.iter() {
        magnitude1 += freq1 * freq1;
        
        if let Some(&freq2) = vec2.get(term) {
            dot_product += freq1 * freq2;
        }
    }

    // Calculate magnitude of vec2
    for (_, &freq2) in vec2.iter() {
        magnitude2 += freq2 * freq2;
    }

    magnitude1 = magnitude1.sqrt();
    magnitude2 = magnitude2.sqrt();

    if magnitude1 == 0.0 || magnitude2 == 0.0 {
        return 0.0;
    }

    dot_product / (magnitude1 * magnitude2)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cosine_similarity_identical() {
        let mut vec1 = HashMap::new();
        vec1.insert("hello".to_string(), 0.5);
        vec1.insert("world".to_string(), 0.5);

        let similarity = cosine_similarity(&vec1, &vec1);
        assert!((similarity - 1.0).abs() < 0.0001);
    }

    #[test]
    fn test_cosine_similarity_different() {
        let mut vec1 = HashMap::new();
        vec1.insert("hello".to_string(), 1.0);

        let mut vec2 = HashMap::new();
        vec2.insert("world".to_string(), 1.0);

        let similarity = cosine_similarity(&vec1, &vec2);
        assert_eq!(similarity, 0.0);
    }
}
