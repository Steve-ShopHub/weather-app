// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units={units}

// https://api.openweathermap.org/data/2.5/weather?q=Swindon&appid=99047a288c2f142af21062296db82acc&units=metric

const userApiKey = "99047a288c2f142af21062296db82acc";

let userCity = "Swindon";
let userUnits = "metric";

let userLat;
let userLong;

/// Get user location

async function geoSuccess(position) {
  userLat = position.coords.latitude.toString();
  userLong = position.coords.longitude.toString();

  // console.log(position.coords.latitude.toString());
  // console.log(position.coords.longitude.toString());
  return [userLat, userLong];
}

const geoOptions = {
  enableHighAccuracy: true,
};

function geoError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function getGeolocation() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}

getGeolocation();

// let [userLat, userLong] = getGeolocation();

console.log(userLat);
console.log(userLong);

function userTempSymbol() {
  let tempSymbol;
  if (userUnits === "imperial") {
    tempSymbol = "°F";
  } else tempSymbol = "°C";
  return tempSymbol;
}

async function fetchWeather(lat, long, apiKey, units) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}}&lon=${long}&appid=${apiKey}&units=${units}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const weather = {
      main: await weatherData.weather[0].main,
      desc: await weatherData.weather[0].description,
      temp: `${await weatherData.main.temp}${userTempSymbol()}`,
    };
    // console.log(weather);
    // console.log(weatherData);
    return weather;
  } catch (error) {
    console.log("Error", error);
  }
  return null;
}

// fetchWeather(userCity, userApiKey, userUnits);

async function logWeather() {
  let weather = await fetchWeather(userLat, userLong, userApiKey, userUnits);
  console.log(weather.main);
  console.log(weather.desc);
  console.log(weather.temp);
}

logWeather();
