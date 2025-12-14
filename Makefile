.PHONY: help dev build test clean deploy logs

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start all services in development mode
	docker-compose up -d
	@echo "✅ All services started!"
	@echo "Frontend: http://localhost:3000"
	@echo "API Gateway: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"

build: ## Build all Docker images
	docker-compose build
	@echo "✅ All images built!"

test: ## Run all tests
	@echo "Running API Gateway tests..."
	cd services/api-gateway && pytest
	@echo "Running Forms Service tests..."
	cd services/forms-service && go test ./...
	@echo "Running Plagiarism Service tests..."
	cd services/plagiarism-service && cargo test
	@echo "✅ All tests passed!"

test-integration: ## Run integration tests
	@echo "Running integration tests..."
	docker-compose -f docker-compose.test.yml up --abort-on-container-exit
	@echo "✅ Integration tests completed!"

logs: ## View logs from all services
	docker-compose logs -f

logs-api: ## View API Gateway logs
	docker-compose logs -f api-gateway

logs-forms: ## View Forms Service logs
	docker-compose logs -f forms-service

logs-plagiarism: ## View Plagiarism Service logs
	docker-compose logs -f plagiarism-service

stop: ## Stop all services
	docker-compose down
	@echo "✅ All services stopped!"

clean: ## Clean up containers, volumes, and images
	docker-compose down -v --remove-orphans
	docker system prune -f
	@echo "✅ Cleanup complete!"

restart: stop dev ## Restart all services

deploy-local: ## Deploy to local Kubernetes (minikube/kind)
	kubectl apply -f infrastructure/k8s/namespace.yaml
	kubectl apply -f infrastructure/k8s/
	@echo "✅ Deployed to local Kubernetes!"

deploy-prod: ## Deploy to production Kubernetes
	kubectl apply -f infrastructure/k8s/ --namespace=production
	@echo "✅ Deployed to production!"

k8s-status: ## Check Kubernetes deployment status
	kubectl get pods -n smartscreen
	kubectl get services -n smartscreen
	kubectl get ingress -n smartscreen

terraform-init: ## Initialize Terraform
	cd infrastructure/terraform && terraform init

terraform-plan: ## Plan Terraform changes
	cd infrastructure/terraform && terraform plan

terraform-apply: ## Apply Terraform changes
	cd infrastructure/terraform && terraform apply

monitoring: ## Start monitoring stack (Prometheus + Grafana)
	docker-compose -f docker-compose.monitoring.yml up -d
	@echo "✅ Monitoring stack started!"
	@echo "Grafana: http://localhost:3001 (admin/admin)"
	@echo "Prometheus: http://localhost:9090"

db-migrate: ## Run database migrations
	docker-compose exec api-gateway alembic upgrade head
	@echo "✅ Database migrations completed!"

db-shell: ## Open PostgreSQL shell
	docker-compose exec postgres psql -U smartscreen -d smartscreen

redis-cli: ## Open Redis CLI
	docker-compose exec redis redis-cli

format: ## Format code in all services
	cd services/api-gateway && black . && isort .
	cd services/forms-service && go fmt ./...
	cd services/plagiarism-service && cargo fmt
	cd frontend && npm run format
	@echo "✅ Code formatted!"

lint: ## Lint all services
	cd services/api-gateway && flake8 . && mypy .
	cd services/forms-service && golangci-lint run
	cd services/plagiarism-service && cargo clippy
	cd frontend && npm run lint
	@echo "✅ Linting complete!"

install-deps: ## Install dependencies for all services
	cd services/api-gateway && pip install -r requirements.txt
	cd services/forms-service && go mod download
	cd services/plagiarism-service && cargo build
	cd services/ai-detection && pip install -r requirements.txt
	cd services/ranking-service && pip install -r requirements.txt
	cd services/notification-service && npm install
	cd frontend && npm install
	@echo "✅ Dependencies installed!"

seed-db: ## Seed database with test data
	docker-compose exec api-gateway python scripts/seed_db.py
	@echo "✅ Database seeded!"

benchmark: ## Run performance benchmarks
	@echo "Running benchmarks..."
	cd services/plagiarism-service && cargo bench
	@echo "✅ Benchmarks complete!"
