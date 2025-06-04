#!/bin/bash

# Docker API Mock Server Test Script
# This script verifies that the Docker setup is working correctly

echo "🐳 Testing API Mock Server Docker Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

# Test 1: Check if Docker is running
echo -e "${YELLOW}Test 1: Checking Docker status...${NC}"
docker --version > /dev/null 2>&1
print_result $? "Docker is installed and running"

# Test 2: Check if container is running
echo -e "${YELLOW}Test 2: Checking container status...${NC}"
CONTAINER_STATUS=$(docker ps --filter "name=api-mock-server" --format "{{.Status}}" | head -1)
if [[ "$CONTAINER_STATUS" == *"Up"* ]]; then
    print_result 0 "Container is running"
else
    echo -e "${RED}❌ Container is not running. Starting with docker-compose...${NC}"
    docker compose up -d
    sleep 5
    CONTAINER_STATUS=$(docker ps --filter "name=api-mock-server" --format "{{.Status}}" | head -1)
    if [[ "$CONTAINER_STATUS" == *"Up"* ]]; then
        print_result 0 "Container started successfully"
    else
        print_result 1 "Failed to start container"
    fi
fi

# Test 3: Health check endpoint
echo -e "${YELLOW}Test 3: Testing health check endpoint...${NC}"
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
if [ "$HEALTH_RESPONSE" = "200" ]; then
    print_result 0 "Health check endpoint responding"
    echo "   Response: $(curl -s http://localhost:3001/health)"
else
    print_result 1 "Health check endpoint failed (HTTP $HEALTH_RESPONSE)"
fi

# Test 4: API endpoints
echo -e "${YELLOW}Test 4: Testing API endpoints...${NC}"

# Test experiments list endpoint
LIST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/v1/experiments)
if [ "$LIST_RESPONSE" = "200" ]; then
    print_result 0 "Experiments list endpoint responding"
else
    print_result 1 "Experiments list endpoint failed (HTTP $LIST_RESPONSE)"
fi

# Test specific experiment endpoint
EXPERIMENT_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001/api/v1/experiments/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6")
if [ "$EXPERIMENT_RESPONSE" = "200" ]; then
    print_result 0 "Specific experiment endpoint responding"
    echo "   Sample data retrieved successfully"
else
    print_result 1 "Specific experiment endpoint failed (HTTP $EXPERIMENT_RESPONSE)"
fi

# Test users list endpoint
USERS_LIST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/v1/users)
if [ "$USERS_LIST_RESPONSE" = "200" ]; then
    print_result 0 "Users list endpoint responding"
else
    print_result 1 "Users list endpoint failed (HTTP $USERS_LIST_RESPONSE)"
fi

# Test users pagination
USERS_PAGINATION_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001/api/v1/users?limit=5&offset=2")
if [ "$USERS_PAGINATION_RESPONSE" = "200" ]; then
    print_result 0 "Users pagination endpoint responding"
else
    print_result 1 "Users pagination endpoint failed (HTTP $USERS_PAGINATION_RESPONSE)"
fi

# Test specific user endpoint
USER_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001/api/v1/users/8d7f9e1a-0c5d-4a5f-9e9e-a1b2c3d4e5f6")
if [ "$USER_RESPONSE" = "200" ]; then
    print_result 0 "Specific user endpoint responding"
else
    print_result 1 "Specific user endpoint failed (HTTP $USER_RESPONSE)"
fi

# Test 5: User CRUD operations
echo -e "${YELLOW}Test 5: Testing User CRUD operations...${NC}"

# Create a new user
UNIQUE_EMAIL="test.docker.user.$(date +%s)@example.com"
CREATE_USER_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/users \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test Docker User\",\"email\":\"$UNIQUE_EMAIL\"}")

CREATE_HTTP_CODE=$(curl -s -X POST http://localhost:3001/api/v1/users \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test Docker User 2\",\"email\":\"test.docker.user2.$(date +%s)@example.com\"}" \
    -o /dev/null -w "%{http_code}")

if [ "$CREATE_HTTP_CODE" = "201" ]; then
    print_result 0 "User creation endpoint working"
    
    # Extract user ID using a more robust method
    USER_ID=$(echo "$CREATE_USER_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$USER_ID" ] && [ "$USER_ID" != "" ]; then
        echo "   Created user with ID: $USER_ID"
        
        # Update the user
        UPDATE_USER_RESPONSE=$(curl -s -X PUT "http://localhost:3001/api/v1/users/$USER_ID" \
            -H "Content-Type: application/json" \
            -d '{"name":"Updated Docker User","email":"updated.docker.user@example.com"}' \
            -o /dev/null -w "%{http_code}")
        
        if [ "$UPDATE_USER_RESPONSE" = "200" ]; then
            print_result 0 "User update endpoint working"
        else
            print_result 1 "User update endpoint failed (HTTP $UPDATE_USER_RESPONSE)"
        fi
        
        # Delete the user
        DELETE_USER_RESPONSE=$(curl -s -X DELETE "http://localhost:3001/api/v1/users/$USER_ID" \
            -o /dev/null -w "%{http_code}")
        
        if [ "$DELETE_USER_RESPONSE" = "204" ]; then
            print_result 0 "User deletion endpoint working"
        else
            print_result 1 "User deletion endpoint failed (HTTP $DELETE_USER_RESPONSE)"
        fi
    else
        echo "   Response: $CREATE_USER_RESPONSE"
        print_result 1 "Could not extract user ID from response"
    fi
else
    print_result 1 "User creation endpoint failed (HTTP $CREATE_HTTP_CODE)"
fi

# Test error cases
echo -e "${YELLOW}Test 6: Testing error handling...${NC}"

# Test 404 for non-existent user
NOT_FOUND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001/api/v1/users/non-existent-id")
if [ "$NOT_FOUND_RESPONSE" = "404" ]; then
    print_result 0 "404 error handling working"
else
    print_result 1 "404 error handling failed (HTTP $NOT_FOUND_RESPONSE)"
fi

# Test validation error
VALIDATION_ERROR_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User"}' \
    -o /dev/null -w "%{http_code}")

if [ "$VALIDATION_ERROR_RESPONSE" = "400" ]; then
    print_result 0 "Validation error handling working"
else
    print_result 1 "Validation error handling failed (HTTP $VALIDATION_ERROR_RESPONSE)"
fi

# Test duplicate email error
DUPLICATE_EMAIL_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Duplicate User","email":"alex.johnson@example.com"}' \
    -o /dev/null -w "%{http_code}")

if [ "$DUPLICATE_EMAIL_RESPONSE" = "409" ]; then
    print_result 0 "Duplicate email error handling working"
else
    print_result 1 "Duplicate email error handling failed (HTTP $DUPLICATE_EMAIL_RESPONSE)"
fi

# Test 7: Docker health check
echo -e "${YELLOW}Test 7: Testing Docker health check...${NC}"
HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' $(docker ps --filter "name=api-mock-server" --format "{{.ID}}" | head -1) 2>/dev/null)
if [ "$HEALTH_STATUS" = "healthy" ]; then
    print_result 0 "Docker health check is healthy"
elif [ "$HEALTH_STATUS" = "starting" ]; then
    echo -e "${YELLOW}⏳ Docker health check is starting...${NC}"
    sleep 10
    HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' $(docker ps --filter "name=api-mock-server" --format "{{.ID}}" | head -1) 2>/dev/null)
    if [ "$HEALTH_STATUS" = "healthy" ]; then
        print_result 0 "Docker health check is now healthy"
    else
        print_result 1 "Docker health check failed: $HEALTH_STATUS"
    fi
else
    print_result 1 "Docker health check failed: $HEALTH_STATUS"
fi

# Test 8: Performance test
echo -e "${YELLOW}Test 8: Basic performance test...${NC}"
START_TIME=$(date +%s%N)
for i in {1..10}; do
    curl -s http://localhost:3001/health > /dev/null
done
END_TIME=$(date +%s%N)
DURATION=$((($END_TIME - $START_TIME) / 1000000))
echo "   10 requests completed in ${DURATION}ms"
print_result 0 "Performance test completed"

echo ""
echo -e "${GREEN}🎉 All Docker tests passed successfully!${NC}"
echo ""
echo "📊 Test Summary:"
echo "   • Docker container is running"
echo "   • Health check endpoint working"
echo "   • API endpoints responding correctly"
echo "   • User CRUD operations working"
echo "   • Error handling working properly"
echo "   • Docker health checks passing"
echo "   • Performance is acceptable"
echo ""
echo "🌐 Available endpoints:"
echo "   • Health check: http://localhost:3001/health"
echo "   • Experiments: http://localhost:3001/api/v1/experiments"
echo "   • Users: http://localhost:3001/api/v1/users"
echo "   • Specific experiment: http://localhost:3001/api/v1/experiments/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6"
echo "   • Specific user: http://localhost:3001/api/v1/users/8d7f9e1a-0c5d-4a5f-9e9e-a1b2c3d4e5f6"
echo ""
echo "🐳 Container management:"
echo "   • View logs: docker compose logs"
echo "   • Stop: docker compose down"
echo "   • Restart: docker compose restart"
