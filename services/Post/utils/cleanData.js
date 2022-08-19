export const cleanData = (data) => {
  const newData = Object.entries(data).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, value.trim()];
    }
    return [key, value];
  });
  return Object.fromEntries(newData);
};
