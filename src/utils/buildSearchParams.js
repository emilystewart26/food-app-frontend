export function buildSearchParams(filters = {}, location = null) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, val]) => {
    if (Array.isArray(val) && val.length > 0) {
      params.set(key, val.join(","));
    } else if (
      typeof val === "string" &&
      val.trim() !== "" &&
      key !== "useCurrentLocation"
    ) {
      params.set(key, val);
    }
  });

  if (location?.lat && location?.lng) {
    params.set("lat", location.lat);
    params.set("lng", location.lng);
    params.set("radius", filters.radius || "5000");
  }

  return params.toString();
}