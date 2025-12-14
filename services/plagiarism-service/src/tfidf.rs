use std::collections::HashMap;
use unicode_segmentation::UnicodeSegmentation;

pub struct TfIdfCalculator;

impl TfIdfCalculator {
    pub fn new() -> Self {
        TfIdfCalculator
    }

    /// Calculate TF-IDF vector for a given text
    pub fn calculate(&self, text: &str) -> HashMap<String, f64> {
        let words: Vec<String> = text
            .unicode_words()
            .map(|w| w.to_lowercase())
            .collect();

        let total_words = words.len() as f64;
        let mut term_freq: HashMap<String, f64> = HashMap::new();

        // Calculate term frequency
        for word in &words {
            *term_freq.entry(word.clone()).or_insert(0.0) += 1.0;
        }

        // Normalize by total words (TF)
        for (_, freq) in term_freq.iter_mut() {
            *freq /= total_words;
        }

        // For simplicity, we're not calculating IDF here
        // In production, you'd maintain a document corpus and calculate IDF
        term_freq
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_tfidf_calculation() {
        let calculator = TfIdfCalculator::new();
        let text = "hello world hello";
        let vector = calculator.calculate(text);

        assert!(vector.contains_key("hello"));
        assert!(vector.contains_key("world"));
        assert_eq!(*vector.get("hello").unwrap(), 2.0 / 3.0);
        assert_eq!(*vector.get("world").unwrap(), 1.0 / 3.0);
    }
}
