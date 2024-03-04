import { Context, Hono } from "hono";
import { sign } from "hono/jwt";
import Env from "../config/env";
import { StravaService } from "../service/StravaService";
import { ProfileDto } from "../models/Profile/Profile";

const router = new Hono();

const handleStravaAuthCallback = async (c: Context) => {
  const code: string | null = c.req.query("code") ?? null;
  if (!code) {
    c.status(404);
    return c.text("auth.strava.no_code");
  }
  try {
    const stravaAuthenticatedProfile: ProfileDto | null =
      await StravaService.authorizeStravaUser(code);
    if (!stravaAuthenticatedProfile) {
      c.status(404);
      return c.text("auth.strava.no.profile");
    }
    const token = await sign(
      {
        id: stravaAuthenticatedProfile.id,
        username: stravaAuthenticatedProfile.username,
        strava_id: stravaAuthenticatedProfile.strava_athlete_id,
        strava_username: stravaAuthenticatedProfile.strava_username,
        exp: stravaAuthenticatedProfile.strava_auth_expires_at,
      },
      Env.JWT_SECRET,
    );
    return c.json({ token }, 200);
  } catch (error) {
    c.status(500);
    return c.text("auth.strava.failed");
  }
};

const handleStravaAuthRedirect = async (c: Context) => {
  const stravaAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${Env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${Env.STRAVA_REDIRECT_URI}&approval_prompt=auto&scope=activity:read_all`;
  return c.redirect(stravaAuthUrl);
};

router.get("/strava", handleStravaAuthRedirect);

router.get("/strava/callback", handleStravaAuthCallback);
export { router as stravaAuthRouter };
