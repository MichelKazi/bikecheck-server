import { Context, Hono } from "hono";
import { sign } from "hono/jwt";
import Env from "../../config/env";
import { authorizeStravaUser } from "../../client/StravaClient";
import { Profile, ProfileDto } from "../../models/Profile/Profile";

const router = new Hono();
router.get("/strava", async (ctx: Context) => {
  const stravaAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${Env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${Env.STRAVA_REDIRECT_URI}&approval_prompt=auth&scope=activity:read_all`;
  return ctx.redirect(stravaAuthUrl);
});

router.get("/strava/callback", async (ctx: Context) => {
  const code: string | undefined = ctx.req.query("code");
  try {
    // TODO: this authorized profile should come from ProfileService, that way i just pass DTO
    const stravaAuthenticatedProfile: Profile | null =
      await authorizeStravaUser(code);
    if (!stravaAuthenticatedProfile) {
      ctx.status(404);
      return ctx.text("Authentication with Strava failed");
    }
    const dto: ProfileDto = stravaAuthenticatedProfile.toDto();
    const token = await sign(
      {
        id: dto.id,
        username: dto.username,
        strava_id: dto.strava_athlete_id,
        strava_username: dto.strava_username,
        exp: dto.strava_auth_expires_at,
      },
      Env.JWT_SECRET,
    );
    return ctx.json({ token }, 200);
  } catch (error) {
    ctx.status(500);
    return ctx.text("Authentication with Strava failed");
  }
});

export { router as stravaAuthRouter };
