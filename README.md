# API Mock Server

This project is an API mock server that simulates the behavior of a real API for experiments and users. It is built using TypeScript and Express, and it utilizes OpenAPI specifications to define the API endpoints and their behaviors.

## Project Structure

- **src/**: Contains the source code for the application.

  - **app.ts**: Entry point of the application, initializes the Express app and sets up middleware.
  - **routes/**: Contains route definitions.
    - **index.ts**: Sets up the main routes for the application.
    - **experiments.ts**: Defines routes related to experiments.
  - **controllers/**: Contains the logic for handling requests.
    - **experimentsController.ts**: Handles requests related to experiments.
  - **middleware/**: Contains middleware functions.
    - **errorHandler.ts**: Handles errors and sends appropriate responses.
    - **validation.ts**: Validates incoming requests based on OpenAPI specifications.
  - **services/**: Contains services for data interaction.
    - **dataService.ts**: Provides methods to interact with mock data.
  - **types/**: Contains TypeScript interfaces.
    - **index.ts**: Defines the structure of data used in the application.
  - **utils/**: Contains utility functions.
    - **helpers.ts**: Assists with common tasks.

- **data/**: Contains data files.

  - **openapi.json**: OpenAPI specification for the API.
  - **mock-data.json**: Mock data for users and experiments.

- **tsconfig.json**: TypeScript configuration file.

- **package.json**: npm configuration file.

## Setup Instructions

### Option 1: Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd api-mock-server
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the server:

   ```bash
   pnpm start
   ```

5. For development with hot reload:
   ```bash
   pnpm run dev
   ```

### Option 2: Docker (Recommended)

1. **Quick start with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

2. **For development:**

   ```bash
   docker-compose --profile dev up --build
   ```

3. **Using Docker directly:**

   ```bash
   # Build the image
   docker build -t api-mock-server .

   # Run the container
   docker run -p 3000:3000 api-mock-server
   ```

For detailed Docker instructions, see [DOCKER.md](./DOCKER.md).

## API Documentation

### 📚 Interactive API Docs

The API documentation is automatically generated from the OpenAPI specification and available in multiple formats:

- **GitHub Pages**: [Live API Documentation](https://YOUR_USERNAME.github.io/YOUR_REPO/) *(Update this URL)*
- **Local Documentation**: `docs/index.html`
- **OpenAPI Spec**: `data/openapi.json`

### 🌐 View Documentation Locally

```bash
# Start a local documentation server
./serve-docs.sh

# Or manually serve the docs directory
cd docs && python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### 🚀 Auto-Deployment

The documentation is automatically deployed to GitHub Pages when:
- Changes are pushed to the main branch
- The `data/openapi.json` file is updated
- The workflow is manually triggered

### 📝 Available Endpoints

#### Experiments API
- `GET /api/v1/experiments` - List experiments
- `POST /api/v1/experiments` - Create experiment
- `GET /api/v1/experiments/{id}` - Get experiment details
- `PATCH /api/v1/experiments/{id}` - Update experiment
- `DELETE /api/v1/experiments/{id}` - Delete experiment

#### Users API  
- `GET /api/v1/users` - List users (with pagination)
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/{id}` - Get user details
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

#### Health Check
- `GET /health` - Service health status

## Usage

Once the server is running, you can access the API endpoints defined in the OpenAPI specification. Use tools like Postman, curl, or the interactive documentation to interact with the API.

**Base URL**: `http://localhost:3001` (or `http://localhost:3000` for local development)

### Example Requests

```bash
# Check server health
curl http://localhost:3001/health

# List experiments
curl http://localhost:3001/api/v1/experiments

# List users with pagination
curl "http://localhost:3001/api/v1/users?limit=5&offset=0"

# Get specific user
curl http://localhost:3001/api/v1/users/8d7f9e1a-0c5d-4a5f-9e9e-a1b2c3d4e5f6
```

## License

This project is licensed under the MIT License.
