import { db } from "../config/db";
import { Bike, Profile } from "../models";
import { BikeDto } from "../models/Bike/Bike";
import { ProfileDto } from "../models/Profile/Profile";

const bikeRepository = db.getRepository(Bike);

const findBikesByProfile = async (profileDto: ProfileDto) => {
  const profile = new Profile(profileDto);
  return await bikeRepository.findBy({ profile });
};

const updateBike = async (bikeDto: BikeDto) => {
  const bikeToUpdate = await bikeRepository.findBy({ id: bikeDto.id });
  if (!bikeToUpdate) throw new Error(`Bike ${bikeDto.id} not found`);
  const updatedBike = new Bike(bikeDto);
  return await bikeRepository.save(updatedBike);
};

const deleteBike = async (bikeDto: BikeDto) => {
  const bikeToDelete = await bikeRepository.findBy({ id: bikeDto.id });
  if (!bikeToDelete) throw new Error(`Bike ${bikeDto.id} not found`);
  return await bikeRepository.remove(bikeToDelete);
};

const findBikeById = async (bikeId: number) => {
  const bike = await bikeRepository.findOneBy({ id: bikeId });
  return bike;
};

export { findBikeById, findBikesByProfile, deleteBike, updateBike };
