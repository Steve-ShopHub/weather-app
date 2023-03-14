////////// GeoLocation Weather ////////

/*

let userLat;
let userLong;


/// Get user location

async function geoSuccess(position) {
  userLat = position.coords.latitude.toString();
  userLong = position.coords.longitude.toString();
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

async function fetchGeoWeather(lat, long, apiKey, units) {
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
      return weather;
    } catch (error) {
      console.log("Error", error);
    }
    return null;
  }


*/

////////// Submitted Location Weather ////////

// function userTempSymbol() {
//   return "metric";
//   //   let tempSymbol;
//   //   if (userUnits === "imperial") {
//   //     tempSymbol = "°F";
//   //   } else tempSymbol = "°C";
//   //   return tempSymbol;
// }

let userApiKey = "99047a288c2f142af21062296db82acc";
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
