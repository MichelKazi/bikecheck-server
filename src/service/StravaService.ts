import axios, { AxiosError } from "axios";
import Env from "../config/env";
import { ProfileDto } from "../models/Profile/Profile";
import { ProfileService } from "./ProfileService";
import { StravaAuthDto } from "../dto/StravaAuthDto";

const stravaAuthResource = "https://www.strava.com/oauth/token";
const stravaApiV3BaseResource = "https://www.strava.com/api/v3";

const stravaClientConfig = {
  client_id: Env.STRAVA_CLIENT_ID,
  client_secret: Env.STRAVA_CLIENT_SECRET,
};

export interface StravaTokens {
  strava_auth_expires_at: number;
  strava_refresh_token: string;
  strava_access_token: string;
}

const authorizeStravaUser = async (
  code: string | undefined,
): Promise<ProfileDto | null> => {
  try {
    const authResponse = await axios.post(stravaAuthResource, {
      ...stravaClientConfig,
      code: code,
      grant_type: "authorization_code",
    });

    const authPayload: StravaAuthDto = authResponse.data;
    const profile = await ProfileService.handleProfileStravaOAuth(authPayload);
    return profile?.toDto() ?? null;
  } catch (error: unknown) {
    console.log("Failed to authenticate with Strava");
    if (error instanceof AxiosError) {
      console.log(error?.response?.data);
    }

    return null;
  }
};

export const getUnexpiredTokens = async (
  authData: StravaTokens,
): Promise<StravaTokens | null> => {
  if (isAuthExpired(authData.strava_auth_expires_at)) {
    try {
      const authResponse = await axios.post(stravaAuthResource, {
        ...stravaClientConfig,
        grant_type: "refresh_token",
        refresh_token: authData.strava_refresh_token,
      });
      return authResponse.data;
    } catch (error) {
      console.error("Failed to refresh Strava auth", error);
      return null;
    }
  }
  return authData;
};

const isAuthExpired = (expiresAt: number | undefined): boolean => {
  if (!expiresAt) return true;
  return expiresAt <= Math.floor(Date.now() / 1000);
};

export const getProfileWithRefreshedAuth = async (
  profile: ProfileDto,
): Promise<ProfileDto> => {
  const tokens = await getUnexpiredTokens({
    strava_auth_expires_at: profile?.strava_auth_expires_at ?? 0,
    strava_refresh_token: profile?.strava_refresh_token ?? "",
    strava_access_token: profile?.strava_access_token ?? "",
  });
  return {
    ...profile,
    ...tokens,
  };
};

export const getStravaActivityById = async (
  activityId: number,
  accessToken: string,
): Promise<void> => {
  try {
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

export const StravaService = {
  authorizeStravaUser,
  isAuthExpired,
  getUnexpiredTokens,
  getProfileWithRefreshedAuth,
  getStravaActivityById,
  getStravaActivitiesFromDateRange,
};
