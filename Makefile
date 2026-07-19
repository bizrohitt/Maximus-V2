.PHONY: help install dev stop clean migrate createsuperuser test lint format docker-build docker-up docker-down

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

dev: ## Start development servers (Docker)
	docker compose up -d

stop: ## Stop development servers
	docker compose down

clean: ## Stop and remove all containers, volumes
	docker compose down -v --remove-orphans

migrate: ## Run database migrations
	cd backend && python manage.py migrate

createsuperuser: ## Create a superuser
	cd backend && python manage.py createsuperuser

test: ## Run tests
	cd backend && python manage.py test --settings=config.settings.test

lint: ## Run linting
	cd frontend && npm run lint

format: ## Format code
	cd frontend && npm run format

docker-build: ## Build production Docker images
	docker compose -f docker-compose.prod.yml build

docker-up: ## Start production environment
	docker compose -f docker-compose.prod.yml up -d

docker-down: ## Stop production environment
	docker compose -f docker-compose.prod.yml down

shell: ## Open Django shell
	cd backend && python manage.py shell

check: ## Run Django system checks
	cd backend && python manage.py check
