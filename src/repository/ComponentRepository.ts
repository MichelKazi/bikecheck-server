import { db } from "../config/db";
import { Bike, Component } from "../models";
import { BikeDto } from "../models/Bike/Bike";
import { ComponentDto } from "../models/Component/Component";

const componentRepository = db.getRepository(Component);

const findComponentsByBike = async (bikeDto: BikeDto) => {
  const bike = new Bike(bikeDto);
  return await componentRepository.findBy({ bike });
};

const updateComponent = async (componentDto: ComponentDto) => {
  const componentToUpdate = await componentRepository.findBy({
    id: componentDto.id,
  });
  if (!componentToUpdate)
    throw new Error(`Component ${componentDto.id} not found`);
  const updatedcomponent = new Component(componentDto);
  return await componentRepository.save(updatedcomponent);
};

const deleteComponent = async (componentDto: ComponentDto) => {
  const componentToDelete = await componentRepository.findBy({
    id: componentDto.id,
  });
  if (!componentToDelete)
    throw new Error(`Component ${componentDto.id} not found`);
  return await componentRepository.remove(componentToDelete);
};

const findComponentById = async (componentId: number) => {
  const component = await componentRepository.findOneBy({ id: componentId });
  return component;
};

export {
  findComponentById,
  findComponentsByBike,
  deleteComponent,
  updateComponent,
};
