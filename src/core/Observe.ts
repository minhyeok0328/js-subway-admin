export default function Observe<T extends object>(data: T, callback: () => void): T {
  return new Proxy(data, {
    get(target: T, property: Extract<keyof T, string | symbol>) {
      return target[property];
    },
    set(target: T, property: Extract<keyof T, string | symbol>, newValue: any): boolean {
      const oldValue = target[property];
      target[property] = newValue;

      if (!Object.is(oldValue, newValue)) {
        callback?.();
      }

      return true;
    },
  });
}
