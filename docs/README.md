# API Documentation

This directory contains the API documentation generated from the OpenAPI specification.

## 📚 Documentation

The API documentation is automatically generated from `data/openapi.json` and deployed to GitHub Pages.

### 🌐 Live Documentation

- **GitHub Pages**: [Your API Docs](https://YOUR_USERNAME.github.io/YOUR_REPO/) _(Update this URL)_
- **Local Development**: Open `docs/index.html` in your browser

### 🔧 Local Development

To view the documentation locally:

1. **Option 1: Open directly**

   ```bash
   # Open the HTML file in your browser
   open docs/index.html
   ```

2. **Option 2: Serve with Python**

   ```bash
   # Python 3
   cd docs && python -m http.server 8080
   # Then open http://localhost:8080
   ```

3. **Option 3: Serve with Node.js**
   ```bash
   # Install a simple server
   npm install -g http-server
   cd docs && http-server -p 8080
   # Then open http://localhost:8080
   ```

### 🚀 Deployment

The documentation is automatically deployed to GitHub Pages when:

- Changes are pushed to the `main` or `master` branch
- The `data/openapi.json` file is modified
- The workflow is manually triggered

### 📝 OpenAPI Specification

The API specification includes:

#### 📊 **Experiments API**

- `GET /api/v1/experiments` - List experiments with filtering
- `POST /api/v1/experiments` - Create new experiment
- `GET /api/v1/experiments/{id}` - Get experiment details
- `PATCH /api/v1/experiments/{id}` - Update experiment
- `DELETE /api/v1/experiments/{id}` - Delete experiment
- `GET /api/v1/experiments/{id}/members` - List experiment members

#### 👥 **Users API**

- `GET /api/v1/users` - List users with pagination
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users/{id}` - Get user details
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

### 🛠️ Features

- **Interactive API Explorer**: Test endpoints directly from the documentation
- **Request/Response Examples**: See example data for all endpoints
- **Schema Documentation**: Detailed model definitions
- **Try It Out**: Execute API calls with custom parameters
- **Download Specification**: Export OpenAPI spec in JSON format

### 🔄 Updates

To update the documentation:

1. Modify `data/openapi.json`
2. Commit and push changes
3. GitHub Actions will automatically rebuild and deploy the docs

### 🎨 Customization

The documentation styling can be customized by editing:

- `docs/index.html` - Main documentation page
- `.github/workflows/deploy-docs.yml` - Deployment workflow
- CSS styles in the HTML file for custom branding
