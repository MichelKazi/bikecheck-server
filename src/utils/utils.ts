/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const capitalize = (text: string): string => {
  return `${text.charAt(0).toUpperCase() + text.slice(1)}`;
};

const Getters =
  () =>
    <T extends { new(...args: any[]): {} }>(constructor: T) => {
      return class extends constructor {
        constructor(...args: any[]) {
          super(...args);
          const props = Object.keys(this);
          props.forEach((prop: string) => {
            const capitalizedKey = capitalize(prop);
            const methodName = `get${capitalizedKey}`;
            Object.defineProperty(this, methodName, {
              value: () => this[prop as keyof this],
            });
          });
        }
      };
    };

const getter = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): any => {
  if (typeof propertyKey === "symbol") propertyKey.toString();
  const propertyName = propertyKey as string;
  const methodName = `get${capitalize(propertyName)}`;
  Object.defineProperty(target);
};

const setter = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): any => {
  if (typeof propertyKey === "symbol") propertyKey.toString();
  const propertyName = propertyKey as string;
  const methodName = `get${capitalize(propertyName)}`;
  target[methodName] = (value: any) => (target[propertyName] = value);
};

const Setters =
  () =>
    <T extends { new(...args: any[]): {} }>(constructor: T) => {
      return class extends constructor {
        constructor(...args: any[]) {
          super(...args);
          const props = Object.keys(this);
          props.forEach((prop: string) => {
            const capitalizedKey = capitalize(prop);
            const methodName = `set${capitalizedKey}`;
            Object.defineProperty(this, methodName, {
              value: (newValue: any) => {
                this[prop as keyof this] = newValue;
              },
            });
          });
        }
      };
    };

export { Getters, Setters };
