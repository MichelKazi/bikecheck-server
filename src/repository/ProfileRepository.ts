import { db } from "../config/db";
import { Profile } from "../models/";
import { ProfileDto } from "../models/Profile/Profile";

const profileRepository = db.getRepository(Profile);

const findAllProfiles = async () => {
  return await profileRepository.find();
};

const findProfileByUsername = async (username: string) => {
  return await profileRepository.findOneBy({ username });
};

const createProfile = async (profileDto: ProfileDto) => {
  const existingProfile = await profileRepository.findOneBy({
    username: profileDto.username,
  });
  if (existingProfile)
    throw new Error(`Profile ${profileDto.username} already exists`);

  const newProfile = new Profile(profileDto);
  return await profileRepository.create(newProfile);
};

const updateProfile = async (profileDto: ProfileDto) => {
  const profileToUpdate = await profileRepository.findOneBy({
    id: profileDto.id,
  });
  if (!profileToUpdate) throw new Error(`Profile ${profileDto.id} not found!`);
  const updatedProfile = new Profile(profileDto);
  return await profileRepository.save(updatedProfile);
};

const deleteProfile = async (profileDto: ProfileDto) => {
  const profileToDelete = await profileRepository.findOneBy({
    id: profileDto.id,
  });
  if (!profileToDelete) throw new Error(`Profile ${profileDto.id} not found!`);
  return await profileRepository.remove(profileToDelete);
};

export {
  findAllProfiles,
  findProfileByUsername,
  createProfile,
  updateProfile,
  deleteProfile,
};
