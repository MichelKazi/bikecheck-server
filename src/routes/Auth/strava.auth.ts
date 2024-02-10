import { Context, Hono } from "hono";
import Env from "../../config/env";
import { authorizeStravaUser } from "../../client/StravaClient";
import { Profile } from "../../models/Profile/Profile";

const router = new Hono();
router.get("/strava/authorize", async (ctx: Context) => {
  const stravaAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${Env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${Env.STRAVA_REDIRECT_URI}&approval_prompt=auth&scope=activity:read_all`;
  return ctx.redirect(stravaAuthUrl);
});

router.get("/strava/callback", async (ctx: Context) => {
  const code: string | undefined = ctx.req.query("code");
  const stravaAuthenticatedProfile: Profile | null =
    await authorizeStravaUser(code);
  if (!stravaAuthenticatedProfile) {
    ctx.status(500);
    return ctx.text("Authentication with Strava failed");
  }
  return ctx.json(
    {
      ...stravaAuthenticatedProfile?.toDto(),
    },
    200,
  );
});

export { router as stravaAuthRouter };
