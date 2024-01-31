import { db } from "../config/db";
import { Profile } from "../models/";
import { ProfileDto } from "../models/Profile/Profile";

const profileRepository = db.getRepository(Profile);

const createProfile = async (profileDto: ProfileDto) => {
  const existingProfile = await profileRepository.findOneBy({
    username: profileDto.username,
  });
  if (existingProfile)
    throw new Error(`Profile ${profileDto.username} already exists`);

  const newProfile = new Profile(profileDto);
  await profileRepository.create(newProfile);
};

export { createProfile };
