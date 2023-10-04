export async function getBreweriesByCity(city) {

  city = city.split(' ').reduce((acc, curr) => acc + `_${curr}`);
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=100`,
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource Not Found');
      } else {
        throw new Error('Something Went Wrong');
      }
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getBreweriesByState(state) {
  state = state.split(' ').reduce((acc, curr) => acc + `_${curr}`);
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&per_page=100`,
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource Not Found');
      } else {
        throw new Error('Something Went Wrong');
      }
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getBreweriesByCoords(userLocation) {
  try {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${userLocation[0]},${userLocation[1]}&per_page=20`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource Not Found');
      } else {
        throw new Error('Something Went Wrong');
      }
    }
    return await response.json();

  } catch (error) {
    return error;
  }
}
