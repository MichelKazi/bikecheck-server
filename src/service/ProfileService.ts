import { refreshProfileAccessToken } from "../client/StravaClient";
import { StravaAuthDto } from "../dto/StravaAuthDto";
import { Profile, ProfileDto } from "../models/Profile/Profile";
import ProfileRepository from "../repository/ProfileRepository";

const getAllProfiles = async (): Promise<Profile[]> => {
  return await ProfileRepository.findAll();
};

const getProfileByStravaId = async (
  stravaAthleteId: number,
): Promise<ProfileDto | null> => {
  const profile: Profile | null =
    await ProfileRepository.findOneByStravaProfileId(stravaAthleteId);
  if (!profile) {
    console.log(`Profile with strava ID ${stravaAthleteId} not found`);
    return null;
  }
  return refreshProfileAccessToken(profile);
};

const getProfileById = async (
  profileId: number,
): Promise<ProfileDto | null> => {
  return await ProfileRepository.findOneById(profileId);
};

const updateProfile = async (
  profileDto: ProfileDto,
): Promise<ProfileDto | null> => {
  const profile = await ProfileRepository.update(profileDto);
  return profile?.toDto() || null;
};

const createProfile = async (
  profileDto: ProfileDto,
): Promise<ProfileDto | null> => {
  const profile = await ProfileRepository.create(profileDto);
  return profile?.toDto() || null;
};

const handleProfileStravaOAuth = async (
  stravaAuthPayload: StravaAuthDto,
): Promise<Profile | null> => {
  let profile = await ProfileRepository.findOneByStravaProfileId(
    stravaAuthPayload?.athlete?.id,
  );
  let dto: ProfileDto = {
    strava_auth_expires_at: stravaAuthPayload.expires_at,
    strava_refresh_token: stravaAuthPayload.refresh_token,
    strava_access_token: stravaAuthPayload.access_token,
  };
  if (profile) {
    dto = {
      ...profile.toDto(),
      ...dto,
    };

    profile = await ProfileRepository.update(dto);
  }
  if (!profile) {
    dto.first_name = stravaAuthPayload.athlete.firstname;
    dto.username = stravaAuthPayload.athlete.username;
    profile = await ProfileRepository.create(dto);
  }

  return profile;
};

export const ProfileService = {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileByStravaId,
  updateProfile,
  updateStravaAuthOrCreateProfile: handleProfileStravaOAuth,
};
