import experimentsRoutes from "./experiments";
import usersRoutes from "./users";

export const setRoutes = (app) => {
  app.use("/api/v1/experiments", experimentsRoutes);
  app.use("/api/v1/users", usersRoutes);
};
