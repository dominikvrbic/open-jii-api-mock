import { Router } from "express";

import { ExperimentsController } from "../controllers/experimentsController";

const router = Router();
const experimentsController = new ExperimentsController();

router.post(
  "/",
  experimentsController.createExperiment.bind(experimentsController),
);
router.get(
  "/",
  experimentsController.listExperiments.bind(experimentsController),
);
router.get(
  "/:id",
  experimentsController.getExperiment.bind(experimentsController),
);
router.patch(
  "/:id",
  experimentsController.updateExperiment.bind(experimentsController),
);
router.delete(
  "/:id",
  experimentsController.deleteExperiment.bind(experimentsController),
);

export default router;
