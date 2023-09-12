export const convertToArray = (
  data: { [s: string]: unknown } | ArrayLike<unknown>
) => {
  if (Array.isArray(data)) return data;
  if (typeof data === "object") return Object.entries(data);
  return [];
};
