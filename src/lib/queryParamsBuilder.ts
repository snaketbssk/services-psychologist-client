const queryParamsBuilder = (parameters: any): string => {
  const queryString = Object.keys(parameters)
    .map((key) => {
      const value = parameters[key];
      if (value === null || value === undefined) return null;
      if (Array.isArray(value) && value.length > 0) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .filter((x) => x !== null)
    .join("&");

  return queryString;
};

export default queryParamsBuilder;
