const filter = (req, res, next) => {
  const {
    manufacturer,
    releaseYear,
    minEngineCapacity,
    maxEngineCapacity,
    color,
    minPrice,
    maxPrice,
  } = req.query;

  if (manufacturer) {
    req.autos = req.autos.filter(
      (c) => c.manufacturer.toLowerCase() === manufacturer.toLowerCase()
    );
  }

  if (releaseYear) {
    req.autos = req.autos.filter(
      (c) => c.yearManufactured === parseInt(yearManufactured)
    );
  }

  if (minEngineCapacity && maxEngineCapacity) {
    req.autos = req.autos.filter(
      (c) =>
        c.engineCapacity >= parseFloat(minEngineCapacity) &&
        c.engineCapacity <= parseFloat(maxEngineCapacity)
    );
  }
  else if (minEngineCapacity) {
    req.autos = req.autos.filter(
      (c) => c.engineCapacity >= parseFloat(minEngineCapacity)
    );
  }
  else if (maxEngineCapacity) {
    req.autos = req.autos.filter(
      (c) => c.engineCapacity <= parseFloat(maxEngineCapacity)
    );
  }

  if (color) {
    req.autos = req.autos.filter(
      (c) => c.color.toLowerCase() === color.toLowerCase()
    );
  }

  if (minPrice && maxPrice) {
    req.autos = req.autos.filter(
      (c) => c.price >= parseInt(minPrice) && c.price <= parseInt(maxPrice)
    );
  }
  else if (minPrice) {
    req.autos = req.autos.filter((c) => c.price >= parseInt(minPrice));
  }
  else if (maxPrice) {
    req.autos = req.autos.filter((c) => c.price <= parseInt(maxPrice));
  }

  next();
};

export default filter;
