export const setCookie = (
  name: string,
  value: string | number,
  daysToLive: number,
) => {
  const encodedValue = encodeURIComponent(value);
  const maxAge = daysToLive * 24 * 60 * 60;
  document.cookie = `${name}=${encodedValue}; max-age=${maxAge}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  return null;
};
