FROM rust:1.82-slim as builder

WORKDIR /app

# Copy source
COPY . .

# Build for release
RUN cargo build --release

# Final stage
FROM debian:bookworm-slim

RUN apt-get update && \
  apt-get install -y libssl3 ca-certificates curl && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/target/release/plagiarism-service .

# Expose port
EXPOSE 8002

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8002/health || exit 1

# Run
CMD ["./plagiarism-service"]
