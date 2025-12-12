# Orders API - Makefile
.PHONY: help install build deploy-dev deploy-hml deploy-prd clean test

# Default target
help:
	@echo "Orders API - Available commands:"
	@echo "  install     - Install all dependencies"
	@echo "  build       - Build SAM application"
	@echo "  deploy-dev  - Deploy to development environment"
	@echo "  deploy-hml  - Deploy to homologation environment"
	@echo "  deploy-prd  - Deploy to production environment"
	@echo "  clean       - Clean build artifacts"
	@echo "  test        - Run smoke tests"

# Install dependencies in all Lambda functions
install:
	@echo "Installing dependencies..."
	@for dir in src/*/; do \
		if [ -f "$$dir/package.json" ]; then \
			echo "Installing in $$dir"; \
			cd "$$dir" && npm ci && cd - > /dev/null; \
		fi \
	done

# Build SAM application
build: install
	@echo "Building SAM application..."
	sam build

# Deploy to development
deploy-dev: build
	@echo "Deploying to development..."
	sam deploy --config-env dev --no-confirm-changeset

# Deploy to homologation
deploy-hml: build
	@echo "Deploying to homologation..."
	sam deploy --config-env hml

# Deploy to production
deploy-prd: build
	@echo "Deploying to production..."
	sam deploy --config-env prd

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf .aws-sam/
	@for dir in src/*/; do \
		if [ -d "$$dir/node_modules" ]; then \
			echo "Cleaning $$dir/node_modules"; \
			rm -rf "$$dir/node_modules"; \
		fi \
	done

# Run basic smoke tests
test:
	@echo "Running smoke tests..."
	@echo "Add your test commands here"