import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { serve } from "@hono/node-server";

dotenv.config();

const port = process.env.PORT || "3000";

const opts = {
  fetch: app.fetch,
  createServer: http.createServer,
  port: parseInt(port),
};

serve(opts, (info) => {
  console.log(`Listening on ${info.address}:${info.port}`);
});
