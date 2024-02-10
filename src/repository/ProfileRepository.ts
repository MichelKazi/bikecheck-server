import { db } from "../config/db";
import { Profile } from "../models/";
import { ProfileDto } from "../models/Profile/Profile";

const profileRepositoryBase = db.getRepository(Profile);

const ProfileRepository = {
  findAll: async (): Promise<Profile[]> => {
    return await profileRepositoryBase.find();
  },

  findOneByUsername: async (username: string): Promise<Profile | null> => {
    return await profileRepositoryBase.findOneBy({ username });
  },

  findOneByStravaProfileId: async (
    stravaId: number,
  ): Promise<Profile | null> => {
    return await profileRepositoryBase.findOne({
      where: {
        strava_athlete_id: stravaId,
      },
    });
  },

  findOneById: async (id: number): Promise<Profile | null> => {
    return await profileRepositoryBase.findOneBy({ id });
  },

  create: async (profileDto: ProfileDto): Promise<Profile | null> => {
    const existingProfile = await profileRepositoryBase.findOne({
      where: {
        username: profileDto.username,
        id: profileDto.id,
        email: profileDto.email,
        strava_athlete_id: profileDto.strava_athlete_id,
        strava_username: profileDto.strava_username,
      },
    });
    if (existingProfile) {
      console.error(`Profile ${profileDto.username} already exists`);
      return null;
    }

    const newProfile = profileRepositoryBase.create(profileDto);
    return await profileRepositoryBase.save(newProfile);
  },

  update: async (profileDto: ProfileDto): Promise<Profile | null> => {
    const profile = await profileRepositoryBase.findOneBy({
      id: profileDto.id,
    });
    if (!profile) {
      console.error(`Profile ${profileDto.id} not found!`);
      return null;
    }

    profileRepositoryBase.merge(profile, profileDto);
    return await profileRepositoryBase.save(profile);
  },

  remove: async (profileDto: ProfileDto): Promise<boolean> => {
    const profileToDelete = await profileRepositoryBase.findOneBy({
      id: profileDto.id,
    });
    if (!profileToDelete) {
      console.error(`Profile ${profileDto.id} not found!`);
      return false;
    }
    await profileRepositoryBase.remove(profileToDelete);
    return true;
  },

  getRepositoryBase: () => {
    return profileRepositoryBase;
  },
};

export default ProfileRepository;
