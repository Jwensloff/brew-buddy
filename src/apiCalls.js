async function getBreweries(city) {
  // 50 results is the default 'per_page' param
  // You must indicate whether you want to return more
  city = city.split(' ').reduce((acc, curr) => acc + `_${curr}`);
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_city=${city}`
    );
    if (!response.ok) {
      throw new Error('Custom error for now');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return error
  }
}

async function getBreweriesByState(state) {
  state = state.split(' ').reduce((acc, curr) => acc + `_${curr}`);
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_state=${state}`
    );
    if (!response.ok) {
      throw new Error('Custom error for now');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return error
  }
}

export {getBreweries, getBreweriesByState}