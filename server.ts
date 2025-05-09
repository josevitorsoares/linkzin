import mongoose from "mongoose";
import { PORT } from "./configs/environment/env";
import { app } from "./src/app";

const startServer = () => {
  app.listen({ port: PORT ?? 3333 }).then(() => {
    console.info("##################################################");
    console.info(`#  🚀 Server listening on http://localhost:${PORT}  #`);
    console.info("##################################################");
  });
};

mongoose.connection.on("connected", () => {
  console.info("##################################################");
  console.info("#       🗃  MongoDB: Successfully connected       #");
  startServer();
});
