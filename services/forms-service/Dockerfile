FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy source
COPY . .

# Download dependencies and generate go.sum, then build
RUN go mod tidy && \
  go mod download && \
  CGO_ENABLED=0 GOOS=linux go build -o forms-service .

# Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates wget

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/forms-service .

# Expose port
EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8001/health || exit 1

# Run
CMD ["./forms-service"]
