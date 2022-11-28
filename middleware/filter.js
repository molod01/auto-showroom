export const makeFilters = (autos) => {
	return {
		manufacturers: [... new Set(autos.map(auto => auto.manufacturer))].sort(),
    releaseYears:  [... new Set(autos.map(auto => auto.releaseYear))].sort(),
		colors: [... new Set(autos.map(auto => auto.color))].sort(),
		engineCapacities: [... new Set(autos
			.filter(auto => auto.engineCapacity )
			.map(auto => auto.engineCapacity))
		].sort(),
    minPrice: Math.min(...autos.map(auto => auto.price)),
    maxPrice: Math.max(...autos.map(auto => auto.price)),
	}
}

export const filter = (req, res, next) => {
  
  const {
    manufacturers,
    releaseYears,
    engineCapacities,
    colors,
    minPrice,
    maxPrice
  } = req.query;

  req.allAutos = req.autos;

  if(manufacturers){
    req.autos = req.autos.filter(
      a => manufacturers.map(a => a.toLowerCase()).includes(a.manufacturer.toLowerCase())
    );
  }
  if (releaseYears) {
    req.autos = req.autos.filter(
      a => releaseYears.map(Number).includes(a.releaseYear)
    );
  }
  if (engineCapacities) {
    req.autos = req.autos.filter(
      a => engineCapacities.map(Number).includes(a.engineCapacity)
    );
  }
  if (colors) {
    req.autos = req.autos.filter(
      a => colors.map(a => a.toLowerCase()).includes(a.color.toLowerCase())
    );
  }
  if (minPrice && maxPrice) {
    req.autos = req.autos.filter(
      a => a.price >= parseInt(minPrice) && a.price <= parseInt(maxPrice)
    );
  }
  else if (minPrice) {
    req.autos = req.autos.filter(a => a.price >= parseInt(minPrice));
  }
  else if (maxPrice) {
    req.autos = req.autos.filter(a => a.price <= parseInt(maxPrice));
  }

  next();
};

