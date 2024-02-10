import { db } from "../config/db";
import { Bike } from "../models";
import { BikeDto } from "../models/Bike/Bike";

const bikeRepositoryBase = db.getRepository(Bike);

const BikeRepository = {
  findAllByProfileId: async (profileId: number) => {
    return await bikeRepositoryBase.find({
      where: {
        profile: {
          id: profileId,
        },
      },
    });
  },

  findOneById: async (bikeId: number) => {
    const bike = await bikeRepositoryBase.findOneBy({ id: bikeId });
    return bike;
  },

  create: async (bikeDto: BikeDto): Promise<BikeDto | null> => {
    const bikeExists = await bikeRepositoryBase.findOne({
      where: {
        profile: {
          id: bikeDto.profile.id,
        },
        name: bikeDto.name,
      },
    });

    if (bikeExists) {
      console.error(
        `Bike ${bikeDto.name} already exists for ${bikeDto.profile?.username}`,
      );
      return null;
    }

    const bike = await bikeRepositoryBase.create(bikeDto);
    return await bikeRepositoryBase.save(bike);
  },

  update: async (bikeDto: BikeDto) => {
    const bike = await bikeRepositoryBase.findOneBy({ id: bikeDto.id });
    if (!bike) throw new Error(`Bike ${bikeDto.id} not found`);
    bikeRepositoryBase.merge(bike, bikeDto);
    return await bikeRepositoryBase.save(bike);
  },

  remove: async (bikeDto: BikeDto): Promise<boolean> => {
    const bikeToDelete = await bikeRepositoryBase.findBy({ id: bikeDto.id });
    if (!bikeToDelete) {
      console.error(`Bike ${bikeDto.id} not found`);
      return false;
    }
    await bikeRepositoryBase.remove(bikeToDelete);
    return true;
  },
};

export default BikeRepository;
