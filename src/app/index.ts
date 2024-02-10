import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { stravaWebhook } from "../routes/webhook/Strava.webhook";
import { stravaAuthRouter } from "../routes/Auth/strava.auth";

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

export default app;
