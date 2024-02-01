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
          const props = Reflect.ownKeys(this);
          props.forEach((prop: string | symbol) => {
            if (typeof prop === "symbol") return;
            const capitalizedKey = capitalize(prop);
            const methodName = `get${capitalizedKey}`;
            Object.defineProperty(this, methodName, {
              value: () => this[prop as keyof this],
            });
          });
        }
      };
    };

const Setters =
  () =>
    <T extends { new(...args: any[]): {} }>(constructor: T) => {
      return class extends constructor {
        constructor(...args: any[]) {
          super(...args);
          const props = Reflect.ownKeys(this);
          props.forEach((prop: string | symbol) => {
            if (typeof prop === "symbol") return;
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
