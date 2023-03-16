////////// GeoLocation Weather ////////

let userApiKey = "99047a288c2f142af21062296db82acc";

async function fetchGeoWeather(position) {
  try {
    const apiKey = userApiKey;
    const lat = position.coords.latitude.toString();
    const long = position.coords.longitude.toString();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const weather = {
      location: await weatherData.name,
      main: await weatherData.weather[0].main,
      desc: await weatherData.weather[0].description,
      temp: `${await weatherData.main.temp}°C`,
    };
    console.log(weatherData);
    console.log(weather.location);
    console.log(weather.main);
    console.log(weather.desc);
    console.log(weather.temp);
    return weather;
  } catch (error) {
    console.log("Error", error);
  }
  return null;
}

const geoOptions = {
  enableHighAccuracy: true,
};
function geoError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function getGeolocation() {
  navigator.geolocation.getCurrentPosition(
    fetchGeoWeather,
    geoError,
    geoOptions
  );
}

getGeolocation();

////////// Submitted Location Weather ////////

let userCity = "Swindon";
let userUnits = "metric";

async function fetchInputWeather(city, apiKey, units) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const weather = {
      main: await weatherData.weather[0].main,
      desc: await weatherData.weather[0].description,
      temp: `${await weatherData.main.temp}°C`,
    };
    return weather;
  } catch (error) {
    console.log("Error", error);
  }
  return null;
}

async function logInputWeather(city, apiKey, units) {
  try {
    const weather = await fetchInputWeather(userCity, userApiKey, userUnits);
    // console.log(weather);
    console.log(userCity);
    console.log(weather.main);
    console.log(weather.desc);
    console.log(weather.temp);
  } catch (error) {
    console.log(error);
  }
}

async function submit(event) {
  event.preventDefault();
  userCity = document.querySelector("#location-input-box").value;
  userUnits = "metric";
  userApiKey = "99047a288c2f142af21062296db82acc";
  logInputWeather(userCity, userApiKey, userUnits);
}

const inputLocationSubmitBtn = document.querySelector("#location-submit-btn");

inputLocationSubmitBtn.addEventListener("click", submit);

///////////
