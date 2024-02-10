import { ComponentType } from "../models/enums";
import ComponentRepository from "../repository/ComponentRepository";

const calculateHealthDecrement = (
  componentType: ComponentType,
  distance: number,
): number => {
  return distance / 100;
};

const ComponentHealthService = {
  updateComponentHealthAfterRide: async (
    bikeId: number,
    distance: number,
  ): Promise<void> => {
    const components = await ComponentRepository.findAllByBike(bikeId);

    components.forEach(async (component) => {
      const healthDecrement = calculateHealthDecrement(
        component.type,
        distance,
      );
      component.status = Math.max(0, component.status - healthDecrement);
      component.mileage += distance;
      await ComponentRepository.update(component);
    });
  },
};

export default ComponentHealthService;
