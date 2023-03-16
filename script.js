////////// GeoLocation Weather ////////

let userApiKey = "99047a288c2f142af21062296db82acc";

//////// Append weather ////////

/*

function getWeatherIcon(day, desc) {
  
  let time;

  day ? time = 'd' : time = 'n';

  let weatherImgType;

  let icon;

  if (desc === 'clear sky') {
    weatherImgType = '01'
  }
  if (desc === 'few clouds') {
    weatherImgType = '02'
  }

  // ...continue for all icons
  

  let iconUrl;
  iconUrl = `https://openweathermap.org/img/wn/${weatherImgType}${time}.png`
  return iconUrl;
}

*/

function getWeatherIcon(dayStatus, main) {
  let day = dayStatus;
  let time;

  // day ? (time = "-day") : (time = "-night");

  time = "-day";

  let image;
  let weatherImgType;

  if (main === "Drizzle") {
    weatherImgType = "rain";
  } else if (main === "Rain") {
    weatherImgType = "rain";
  } else if (main === "Snow") {
    weatherImgType = "snow";
  } else if (main === "Clear") {
    weatherImgType = "clear";
  } else if (main === "Clouds") {
    weatherImgType = "clouds";
  } else if (main === "Thunderstorm") {
    weatherImgType = "thunder";
  } else {
    weatherImgType = "clouds"; // If mainription does not match any of the icons, return an empty string
  }

  let iconUrl;

  iconUrl = `./imgs/${weatherImgType}${time}.png`;

  // iconUrl = `https://openweathermap.org/img/wn/${weatherImgType}${time}.png`;

  return iconUrl;
}

function appendWeather(weather) {
  const locationText = document.querySelector(".location");
  const temperatureText = document.querySelector(".temperature");
  const descriptionText = document.querySelector(".description");
  const imgContainer = document.querySelector(".img");
  const img = document.querySelector("#img");

  let iconUrl = getWeatherIcon(true, weather.main);

  locationText.textContent = weather.location;
  temperatureText.textContent = weather.temp;
  descriptionText.textContent = weather.desc;
  img.src = iconUrl;
}

let weather;

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

    weather = {
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
    appendWeather(weather);
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

    weather = {
      location: await weatherData.name,
      main: await weatherData.weather[0].main,
      desc: await weatherData.weather[0].description,
      temp: `${await weatherData.main.temp}°C`,
    };
    appendWeather(weather);
    return weather;
  } catch (error) {
    console.log("Error", error);
  }
  return null;
}

async function logInputWeather(city, apiKey, units) {
  try {
    weather = await fetchInputWeather(userCity, userApiKey, userUnits);
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

///// Loading animation ///////
