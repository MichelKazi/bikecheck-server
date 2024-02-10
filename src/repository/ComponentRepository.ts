import { db } from "../config/db";
import { Component } from "../models";
import { ComponentDto } from "../models/Component/Component";

const componentRepositoryBase = db.getRepository(Component);

const ComponentRepository = {
  findAllByBike: async (bikeId: number): Promise<Component[]> => {
    return await componentRepositoryBase.find({
      where: {
        bike: {
          id: bikeId,
        },
      },
    });
  },

  findOneById: async (id: number): Promise<Component | null> => {
    return await componentRepositoryBase.findOneById(id);
  },

  create: async (componentDto: ComponentDto): Promise<Component | null> => {
    const exists = await componentRepositoryBase.findOne({
      where: {
        ...componentDto,
        bike: {
          id: componentDto.bike.id,
        },
      },
    });
    if (exists) {
      console.error(`Component ${componentDto.type} already exists`);
      return null;
    }
    const component = componentRepositoryBase.create(componentDto);
    return await componentRepositoryBase.save(component);
  },

  update: async (componentDto: ComponentDto): Promise<Component | null> => {
    const component = await componentRepositoryBase.findOneById(
      componentDto.id,
    );
    if (!component) {
      throw new Error(`Component: ${componentDto.id} not found`);
      return null;
    }
    componentRepositoryBase.merge(component, componentDto);

    return await componentRepositoryBase.save(component);
  },

  remove: async (componentDto: ComponentDto): Promise<boolean> => {
    const exists = await componentRepositoryBase.findOneById(componentDto.id);
    if (!exists) {
      console.error(`Component: ${componentDto.id} not found`);
      return false;
    }
    await componentRepositoryBase.remove(exists);
    return true;
  },
};

export default ComponentRepository;
