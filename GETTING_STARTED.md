# SmartScreen AI - Getting Started

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Docker Desktop installed
- 8GB RAM minimum
- Ports 80, 3000, 5432, 6379, 8000-8005 available

### Start the Application

```bash
# Clone the repository
git clone <your-repo-url>
cd smartscreen-ai

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Access the Application

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)
- **MinIO Console**: http://localhost:9001 (smartscreen/dev_password_123)

## 📊 Architecture Overview

```
┌─────────────┐
│   Nginx     │ ← Reverse Proxy
└──────┬──────┘
       │
   ┌───┴────┐
   │Frontend│ (React + Vite)
   └────────┘
       │
┌──────┴──────┐
│ API Gateway │ (FastAPI - Python)
└──────┬──────┘
       │
   ┌───┴────────────────┬──────────────┐
   │                    │              │
┌──▼──────┐  ┌─────────▼──┐  ┌────────▼────┐
│ Forms   │  │ Plagiarism │  │ AI Detection│
│ (Go)    │  │ (Rust)     │  │ (Python)    │
└─────────┘  └────────────┘  └─────────────┘
```

## 🛠️ Development

### Running Individual Services

```bash
# API Gateway
cd services/api-gateway
pip install -r requirements.txt
uvicorn main:app --reload

# Forms Service
cd services/forms-service
go run main.go

# Plagiarism Service
cd services/plagiarism-service
cargo run
```

### Running Tests

```bash
make test
```

## ☸️ Kubernetes Deployment

```bash
# Deploy to local K8s (minikube)
minikube start
make deploy-local

# Check status
kubectl get pods -n smartscreen
```

## 🎯 Next Steps

1. Configure Google OAuth credentials in `.env`
2. Set up Microsoft OAuth (optional)
3. Configure GPTZero API key for AI detection
4. Customize the frontend branding
5. Deploy to production cluster

## 📖 Documentation

- [Full README](../README.md)
- [Implementation Plan](../implementation_plan.md)
- [API Documentation](http://localhost:8000/docs)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - see [LICENSE](../LICENSE)
