import axios from "axios";
import Env from "../config/env";
import { Profile, ProfileDto } from "../models/Profile/Profile";
import { ProfileService } from "../service/ProfileService";
import { StravaAuthDto } from "../dto/StravaAuthDto";

const stravaAuthResource = "https://www.strava.com/oauth/token";

const stravaClientConfig = {
  client_id: Env.STRAVA_CLIENT_ID,
  client_secret: Env.STRAVA_CLIENT_SECRET,
};

export const authorizeStravaUser = async (
  code: string | undefined,
): Promise<Profile | null> => {
  try {
    const authResponse = await axios.post(stravaAuthResource, {
      ...stravaClientConfig,
      code: code,
      grant_type: "authorization_code",
    });

    const authPayload: StravaAuthDto = authResponse.data;
    return await ProfileService.updateStravaAuthOrCreateProfile(authPayload);
  } catch (error) {
    console.log("Failed to authenticate with Strava");
    console.error(error);
    return null;
  }
};

export const refreshAccessToken = async (
  profileDto: ProfileDto,
): Promise<void> => {
  const { strava_auth_expires_at } = profileDto;
  if (
    strava_auth_expires_at &&
    strava_auth_expires_at <= Math.floor(Date.now() / 1000)
  ) {
    try {
      const authResponse = await axios.post(stravaAuthResource, {
        ...stravaClientConfig,
        grant_type: "refresh_token",
        refresh_token: profileDto.strava_refresh_token,
      });
      const authPayload = authResponse.data;
      await ProfileService.updateStravaAuthOrCreateProfile(authPayload);
    } catch (error) {
      console.error("Failed to refresh Strava auth", error);
      throw new Error("Token refresh failed");
    }
  }
};
