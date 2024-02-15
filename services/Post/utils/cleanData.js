export const cleanData = (data) => {
  const newData = Object.entries(data).map(([key, value]) => {
    if (typeof value === "string") {
      if (value.startsWith('[') || value === 'null'){
        return [key, JSON.parse(value)]
      }
      if (value === "") return [key, false]
      return [key, value.trim()];
    }
    return [key, value];
  });
  return Object.fromEntries(newData);
};
