export function buildSearchParams(filters = {}, location = null) {
    const params = new URLSearchParams();
  
    Object.entries(filters).forEach(([key, val]) => {
      if (Array.isArray(val) && val.length > 0) {
        params.set(key, val.join(','));
      }
    });
  
    if (location?.lat && location?.lng) {
      params.set("lat", location.lat);
      params.set("lng", location.lng);
      params.set("radius", 5000); // or dynamic
    }
  
    return params.toString();
  }