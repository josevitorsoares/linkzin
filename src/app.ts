import { connectDatabase } from "@configs/database/mongoose.database";
import fastify from "fastify";
import { urlRoutes } from "./infrastructure";

export const app = fastify();

app.register(urlRoutes);

// # Connect to MongoDB
connectDatabase();
