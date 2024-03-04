import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { stravaWebhook } from "../routes/webhook/Strava.webhook";
import { stravaAuthRouter } from "../routes/strava.auth";
import Env from "../config/env";

const app = new Hono();
app.use("*", prettyJSON());
app.use("*", logger());

// Initialize routes
app.route("/webhook", stravaWebhook);
app.route("/auth", stravaAuthRouter);

app.get("/", (ctx) => {
  const name = ctx.req.query("name") ?? "bitch";
  return ctx.json({
    message: `Hello ${name}!`,
  });
});

app.use(
  "/secret/*",
  jwt({
    secret: Env.JWT_SECRET,
  }),
);

app.get("/secret/page", (ctx) => {
  const payload = ctx.get("jwtPayload");
  return ctx.json(payload);
});

export default app;
