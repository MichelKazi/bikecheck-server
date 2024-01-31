import database from "../config/db";
import { Profile } from "../models/";

const createProfile = async (profileData: Profile) => {
  const [userId] = await database("profile")
    .insert(profileData)
    .returning("id");
  return userId;
};

const fetchProfileById = async (profileId: string) => {
  const [profile] = await database("profile").where({ id: profileId }).first();
  return profile as Profile;
};

export { createProfile, fetchProfileById };
