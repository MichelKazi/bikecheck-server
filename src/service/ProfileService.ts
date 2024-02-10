import { StravaAuthDto } from "../dto/StravaAuthDto";
import { Profile, ProfileDto } from "../models/Profile/Profile";
import ProfileRepository from "../repository/ProfileRepository";

const getAllProfiles = async (): Promise<Profile[]> => {
  return await ProfileRepository.findAll();
};

const getProfileById = async (
  profileId: number,
): Promise<ProfileDto | null> => {
  return await ProfileRepository.findOneById(profileId);
};

const updateProfile = async (
  profileDto: ProfileDto,
): Promise<Profile | null> => {
  return await ProfileRepository.update(profileDto);
};

const createProfile = async (
  profileDto: ProfileDto,
): Promise<Profile | null> => {
  return await ProfileRepository.create(profileDto);
};

const updateStravaAuthOrCreateProfile = async (
  stravaAuthPayload: StravaAuthDto,
): Promise<Profile | null> => {
  let profile = await ProfileRepository.findOneByStravaProfileId(
    stravaAuthPayload?.athlete?.id,
  );
  let dto: ProfileDto = {
    strava_athlete_id: stravaAuthPayload.athlete.id,
    strava_username: stravaAuthPayload.athlete.username,
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
  console.log(profile);

  return profile;
};

export const ProfileService = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  updateStravaAuthOrCreateProfile,
};
