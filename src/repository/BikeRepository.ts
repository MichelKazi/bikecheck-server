import database from "../config/db";
import { Bike } from "../models/Bike/Bike";

const addBikeToProfile = async (profileId: string, bikeData: Bike) => {
  const [bikeId] = await database("bike").insert({
    ...bikeData,
    profileId,
  });
  return bikeId;
};

const getBikesForProfile = async (profileId: string) => {
  const bikes = await database("bike").where({
    profile_id: profileId,
  });
  return bikes;
};

export { addBikeToProfile, getBikesForProfile };
