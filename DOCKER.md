# Docker Usage Guide

This document provides instructions for building and running the API Mock Server using Docker.

## Quick Start with Docker

### Option 1: Using Docker Compose (Recommended)

1. **Build and run the production container:**
   ```bash
   docker-compose up --build
   ```

2. **For development with hot reload:**
   ```bash
   docker-compose --profile dev up --build
   ```

3. **Run in detached mode:**
   ```bash
   docker-compose up -d
   ```

### Option 2: Using Docker directly

1. **Build the Docker image:**
   ```bash
   docker build -t api-mock-server .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3001:3000 \
     -v $(pwd)/data:/app/data:ro \
     --name api-mock-server \
     api-mock-server
   ```

## Development with Docker

For development, use the development Docker setup which includes hot reloading:

```bash
# Build and run development container
docker-compose --profile dev up --build

# Or build the dev image directly
docker build -f Dockerfile.dev -t api-mock-server-dev .
docker run -p 3002:3000 -v $(pwd):/app -v /app/node_modules api-mock-server-dev
```

## Environment Variables

The following environment variables can be configured:

- `PORT`: Port number for the server (default: 3000)
- `NODE_ENV`: Environment (production/development)

Example:
```bash
docker run -p 3001:3000 -e PORT=3000 -e NODE_ENV=production api-mock-server
```

## Health Check

The container includes a health check endpoint at `/health` that returns:
```json
{
  "status": "OK",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## Docker Commands Reference

```bash
# Build the image
docker build -t api-mock-server .

# Run the container
docker run -p 3001:3000 api-mock-server

# Run with volume mount for data updates
docker run -p 3001:3000 -v $(pwd)/data:/app/data:ro api-mock-server

# Run in background
docker run -d -p 3001:3000 --name api-mock-server api-mock-server

# View logs
docker logs api-mock-server

# Stop the container
docker stop api-mock-server

# Remove the container
docker rm api-mock-server

# Remove the image
docker rmi api-mock-server
```

## Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Start development profile
docker-compose --profile dev up

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild and restart
docker-compose down && docker-compose up --build
```

## Accessing the API

Once the container is running, the API will be available at:
- Base URL: `http://localhost:3001`
- Health check: `http://localhost:3001/health`
- API endpoints: `http://localhost:3001/api/v1/experiments`

## Volume Mounts

The Docker setup includes volume mounts for:
- `./data:/app/data:ro` - Read-only mount for OpenAPI spec and mock data
- Development mode also mounts the entire source code for hot reloading

## Testing the Setup

A comprehensive test script is provided to verify that everything is working correctly:

```bash
# Run the Docker test script
./test-docker.sh
```

This script tests:
- Docker container status
- Health check endpoint
- API endpoints functionality
- Docker health checks
- Basic performance

## Troubleshooting

1. **Port already in use:**
   ```bash
   # Use a different port
   docker run -p 3002:3000 api-mock-server
   ```

2. **Check container status:**
   ```bash
   docker ps
   docker logs api-mock-server
   ```

3. **Run the test script for diagnostics:**
   ```bash
   ./test-docker.sh
   ```

4. **Clean up containers and images:**
   ```bash
   docker-compose down
   docker system prune -a
   ```

5. **Rebuild from scratch:**
   ```bash
   docker-compose down
   docker rmi api-mock-server
   docker-compose up --build
   ```
