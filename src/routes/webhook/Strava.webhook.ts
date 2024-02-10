import { Context, Hono } from "hono";
import Env from "../../config/env";
const stravaWebhook = new Hono();

stravaWebhook.post("/strava", async (ctx: Context) => {
  ctx.status(200);
  const data = await ctx.req.json();
  console.log(data);
  return ctx.json({
    message: "EVENT_RECEIVED",
    data: data,
  });
});

stravaWebhook.get("/strava", (ctx: Context) => {
  const mode = ctx.req.query("hub.mode");
  const token = ctx.req.query("hub.verify_token");
  const challenge = ctx.req.query("hub.challenge");

  console.log(ctx);

  if (mode && token) {
    if (mode === "subscribe" && token === Env.STRAVA_VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      ctx.status(200);
      return ctx.json({ "hub.challenge": challenge });
    }
  }

  ctx.status(403);
  return ctx.text("Error");
});

export { stravaWebhook };
