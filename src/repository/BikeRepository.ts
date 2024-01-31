import db from "../config/db";
import { Bike } from "../models/Bike/Bike";

const addBikeToProfile = async (profileId: string, bikeData: Bike) => {
  const [bikeId] = await db("bike").insert({
    ...bikeData,
    profileId,
  });
  return bikeId;
};

const getBikesForProfile = async (profileId: string) => {
  const bikes = await db("bike").where({
    profile_id: profileId,
  });
  return bikes;
};

export { addBikeToProfile, getBikesForProfile };
