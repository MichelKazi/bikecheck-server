import { Context, Hono } from "hono";
import Env from "../../config/env";
import { StravaWebhookEventDTO } from "../../dto/StravaWebhookDto";
import { ProfileService } from "../../service/ProfileService";
import { getStravaActivityById } from "../../client/StravaClient";
const stravaWebhook = new Hono();

const handleActivityUpdate = async (ctx: Context) => {
  const event: StravaWebhookEventDTO = await ctx.req.json();
  const { object_id, owner_id } = event;
  const accessToken =
    (await ProfileService.getProfileStravaAccessToken(owner_id)) ?? "";

  await getStravaActivityById(object_id, accessToken);
  ctx.status(200);
  return ctx.json({
    message: "EVENT_RECEIVED",
    data: event,
  });
};

const handleWebhookCallback = async (ctx: Context) => {
  const mode = ctx.req.query("hub.mode");
  const token = ctx.req.query("hub.verify_token");
  const challenge = ctx.req.query("hub.challenge");

  if (mode && token) {
    if (mode === "subscribe" && token === Env.STRAVA_VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      ctx.status(200);
      return ctx.json({ "hub.challenge": challenge });
    }
  }

  ctx.status(403);
  return ctx.text("Error");
};

stravaWebhook.post("/strava", handleActivityUpdate);

stravaWebhook.get("/strava", handleWebhookCallback);

export { stravaWebhook };
