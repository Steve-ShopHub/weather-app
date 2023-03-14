// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units={units}

// https://api.openweathermap.org/data/2.5/weather?q=Swindon&appid=99047a288c2f142af21062296db82acc&units=metric

const userApiKey = "99047a288c2f142af21062296db82acc";

let userCity = "Swindon";
let userUnits = "metric";

function userTempSymbol() {
  let tempSymbol;
  if (userUnits === "imperial") {
    tempSymbol = "°F";
  } else tempSymbol = "°C";
  return tempSymbol;
}

async function fetchWeather(city, apiKey, units) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`,
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
  let weather = await fetchWeather(userCity, userApiKey, userUnits);
  console.log(weather.main);
  console.log(weather.desc);
  console.log(weather.temp);
}

logWeather();
