import axios from "axios";
import Env from "../config/env";
import { Profile } from "../models/Profile/Profile";
import { ProfileService } from "../service/ProfileService";
import { StravaAuthDto } from "../dto/StravaAuthDto";

const stravaAuthResource = "https://www.strava.com/oauth/token";
const stravaApiV3BaseResource = "https://www.strava.com/api/v3";

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
    return null;
  }
};

export const getOrRefreshAccessToken = async (
  profile: Profile,
): Promise<string> => {
  const strava_auth_expires_at = profile?.strava_auth_expires_at;
  const refresh_token = profile?.strava_refresh_token;
  if (
    strava_auth_expires_at &&
    strava_auth_expires_at <= Math.floor(Date.now() / 1000)
  ) {
    try {
      const authResponse = await axios.post(stravaAuthResource, {
        ...stravaClientConfig,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      });
      const authPayload = authResponse.data;
      const profile: Profile | null =
        await ProfileService.updateStravaAuthOrCreateProfile(authPayload);

      return profile?.strava_access_token ?? "";
    } catch (error) {
      console.error("Failed to refresh Strava auth", error);
      return "";
    }
  }
  return profile?.strava_access_token;
};

export const getStravaActivityById = async (
  activityId: number,
  accessToken: string,
): Promise<void> => {
  try {
    console.log(activityId);
    const response = await axios.get(
      `${stravaApiV3BaseResource}/activities/${activityId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(`Failed to fetch activity ${activityId}: ${error}`);
  }
};

export const getStravaActivitiesFromDateRange = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${stravaApiV3BaseResource}/athlete/activities`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(`Failed to fetch activities: ${error}`);
  }
};
