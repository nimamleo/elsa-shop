export function HandleError(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {}
  };
}
