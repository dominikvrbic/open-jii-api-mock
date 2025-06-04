import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";

import openApiSpec from "../../data/openapi.json";

const ajv = new Ajv();
const validate = ajv.compile(
  openApiSpec.paths["/api/v1/experiments"].post.requestBody.content[
    "application/json"
  ].schema,
);

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validate.errors,
    });
  }
  next();
};
