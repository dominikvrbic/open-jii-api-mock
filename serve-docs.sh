#!/bin/bash

# API Documentation Local Server Script
# This script sets up a local server to preview the API documentation

set -e

echo "🚀 API Documentation Local Server"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "data/openapi.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Expected to find: data/openapi.json"
    exit 1
fi

# Create docs directory if it doesn't exist
mkdir -p docs

# Copy the latest OpenAPI spec
echo "📋 Copying latest OpenAPI specification..."
cp data/openapi.json docs/

# Check if Python is available
if command -v python3 &> /dev/null; then
    SERVER_CMD="python3 -m http.server"
    SERVER_TYPE="Python 3"
elif command -v python &> /dev/null; then
    SERVER_CMD="python -m SimpleHTTPServer"
    SERVER_TYPE="Python 2"
elif command -v node &> /dev/null && npm list -g http-server &> /dev/null; then
    SERVER_CMD="http-server"
    SERVER_TYPE="Node.js http-server"
else
    echo "⚠️  No suitable HTTP server found."
    echo "   Please install one of the following:"
    echo "   • Python 3: python3 -m http.server"
    echo "   • Node.js http-server: npm install -g http-server"
    echo ""
    echo "   Or simply open docs/index.html in your browser"
    echo "   File location: $(pwd)/docs/index.html"
    exit 1
fi

# Start the server
echo "🌐 Starting $SERVER_TYPE server on port 8080..."
echo "📚 Documentation will be available at: http://localhost:8080"
echo ""
echo "🔄 To update the documentation:"
echo "   1. Edit data/openapi.json"
echo "   2. Run this script again to copy the latest version"
echo ""
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

cd docs

if [[ $SERVER_CMD == *"python"* ]]; then
    $SERVER_CMD 8080
else
    $SERVER_CMD -p 8080
fi
