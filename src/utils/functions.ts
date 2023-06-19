export function mask(obj: any) {
  if (Object.keys(obj).includes('password')) {
    return {
      ...obj,
      password: '******'
    };
  }
  return obj;
}
