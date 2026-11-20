export const setCookie = (
  name: string,
  value: string | number,
  daysToLive: number,
) => {
  const encodedValue = encodeURIComponent(value);
  const maxAge = daysToLive * 24 * 60 * 60;
  document.cookie = `${name}=${encodedValue}; max-age=${maxAge}; path=/; SameSite=Lax`;
};
