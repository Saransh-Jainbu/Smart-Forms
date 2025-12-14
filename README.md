# SmartScreen AI

**AI-Powered Plagiarism Detection & Candidate Ranking for Google/Microsoft Forms**

A production-grade, cloud-native microservices application showcasing DevOps excellence.

## 🚀 Features

- **Plagiarism Detection**: Cross-submission comparison with TF-IDF and cosine similarity
- **AI Content Detection**: Identify ChatGPT/AI-generated responses
- **Smart Ranking**: Intelligent candidate scoring based on quality and relevance
- **Multi-Platform**: Google Forms and Microsoft Forms integration
- **Real-time Updates**: WebSocket-powered live notifications
- **Collaboration**: Team features for multi-reviewer workflows

## 🏗️ Architecture

**Microservices (Polyglot)**:
- API Gateway (Python FastAPI) - Authentication, routing, rate limiting
- Forms Service (Go) - Google/Microsoft Forms integration
- Plagiarism Service (Rust) - High-performance text comparison
- File Processing (Go) - PDF/DOCX parsing
- AI Detection (Python) - ML model inference
- Ranking Service (Python) - Candidate scoring
- Notification Service (Node.js) - WebSockets, emails

**Infrastructure**:
- Docker + Kubernetes
- PostgreSQL + Redis + RabbitMQ
- Prometheus + Grafana (monitoring)
- ELK Stack (logging)
- GitHub Actions (CI/CD)
- Terraform (IaC)

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| API Gateway | Python FastAPI |
| Forms Service | Go (Golang) |
| Plagiarism Engine | Rust |
| File Processing | Go |
| AI Detection | Python + ML |
| Ranking | Python FastAPI |
| Notifications | Node.js + Socket.io |
| Frontend | React + Vite + TypeScript |
| Database | PostgreSQL |
| Cache | Redis |
| Message Queue | RabbitMQ |
| Storage | MinIO (S3-compatible) |
| Orchestration | Kubernetes |
| Monitoring | Prometheus + Grafana |
| Logging | ELK Stack |
| CI/CD | GitHub Actions |
| IaC | Terraform |

## 🚦 Quick Start

### Prerequisites
- Docker & Docker Compose
- Make (optional, for convenience)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/smartscreen-ai.git
cd smartscreen-ai

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Run tests
make test

# Stop services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📁 Project Structure

```
smartscreen-ai/
├── services/
│   ├── api-gateway/          # FastAPI - Auth & routing
│   ├── forms-service/        # Go - Forms integration
│   ├── plagiarism-service/   # Rust - Text comparison
│   ├── file-processing/      # Go - File parsing
│   ├── ai-detection/         # Python - AI detection
│   ├── ranking-service/      # FastAPI - Scoring
│   └── notification-service/ # Node.js - Real-time
├── frontend/                 # React + Vite
├── infrastructure/
│   ├── docker/              # Dockerfiles
│   ├── k8s/                 # Kubernetes manifests
│   ├── terraform/           # Infrastructure as Code
│   └── monitoring/          # Prometheus, Grafana
├── proto/                   # gRPC definitions
├── scripts/                 # Utility scripts
├── docker-compose.yml       # Local dev environment
├── Makefile                 # Common commands
└── README.md
```

## 🔧 Development

### Building Individual Services

```bash
# API Gateway
cd services/api-gateway
docker build -t smartscreen/api-gateway .

# Forms Service
cd services/forms-service
docker build -t smartscreen/forms-service .

# Plagiarism Service (Rust)
cd services/plagiarism-service
cargo build --release
```

### Running Tests

```bash
# All tests
make test

# Specific service
cd services/api-gateway
pytest

# Integration tests
make test:integration
```

## ☸️ Kubernetes Deployment

```bash
# Deploy to local K8s (minikube/kind)
make deploy:local

# Deploy to production
make deploy:prod

# Check status
kubectl get pods -n smartscreen

# View logs
kubectl logs -f deployment/api-gateway -n smartscreen
```

## 📊 Monitoring

- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Kibana**: http://localhost:5601

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/smartscreen

# Redis
REDIS_URL=redis://localhost:6379

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_secret

# AI Detection
GPTZERO_API_KEY=your_api_key

# Stripe
STRIPE_SECRET_KEY=your_secret_key
```

## 🎯 Roadmap

- [x] Phase 1: Foundation & Infrastructure
- [ ] Phase 2: Core Microservices
- [ ] Phase 3: Advanced Services
- [ ] Phase 4: Frontend
- [ ] Phase 5: DevOps & K8s
- [ ] Phase 6: Production Deployment

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built with ❤️ using modern DevOps practices and cloud-native technologies.

---

**Made with 🔥 by Saransh Jain**
