import experimentsRoutes from "./experiments";

export const setRoutes = (app) => {
  app.use("/api/v1/experiments", experimentsRoutes);
};
