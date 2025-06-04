import bodyParser from "body-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { join } from "path";

import { errorHandler } from "./middleware/errorHandler";
import { setRoutes } from "./routes/index";

const app = express();
const PORT = process.env.PORT || 3000;

// Load OpenAPI specification
const openApiSpec = JSON.parse(
  readFileSync(join(__dirname, "../data/openapi.json"), "utf-8"),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger UI setup
const swaggerOptions = {
  explorer: true,
  customCss: `
    .topbar { display: none; }
    .swagger-ui .info { margin: 50px 0; }
    .swagger-ui .info .title { font-size: 36px; color: #2c3e50; }
    body { background: #fafafa; }
    .swagger-ui .scheme-container { background: #fff; border-radius: 4px; padding: 20px; margin: 20px 0; }
  `,
  customSiteTitle: "API Mock Server Documentation",
  customfavIcon: "/assets/favicon.ico",
  swaggerOptions: {
    docExpansion: "list",
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    tryItOutEnabled: true,
    supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
  },
};

// Serve Swagger UI at /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec, swaggerOptions));

// Redirect root to docs for convenience
app.get("/", (req, res) => {
  res.redirect("/docs");
});

// Health check endpoint for Docker
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

setRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
