import { Router } from "express";

import { UsersController } from "../controllers/usersController";

const router = Router();
const usersController = new UsersController();

router.post(
  "/",
  usersController.createUser.bind(usersController),
);
router.get(
  "/",
  usersController.listUsers.bind(usersController),
);
router.get(
  "/:id",
  usersController.getUser.bind(usersController),
);
router.put(
  "/:id",
  usersController.updateUser.bind(usersController),
);
router.delete(
  "/:id",
  usersController.deleteUser.bind(usersController),
);

export default router;
