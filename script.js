// function userTempSymbol() {
//   return "metric";
//   //   let tempSymbol;
//   //   if (userUnits === "imperial") {
//   //     tempSymbol = "°F";
//   //   } else tempSymbol = "°C";
//   //   return tempSymbol;
// }

let userCity = "Swindon";
let userUnits = "metric";
let userApiKey = "99047a288c2f142af21062296db82acc";

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
      temp: `${await weatherData.main.temp}°C`,
    };
    return weather;
  } catch (error) {
    console.log("Error", error);
  }
  return null;
}

// async function logWeather(city, apiKey, units) {
//   let weather = await fetchWeather(city, apiKey, units);
//   console.log(weather.main);
//   console.log(weather.desc);
//   console.log(weather.temp);
// }

async function submit(event) {
  event.preventDefault();
  userCity = document.querySelector("#location-input-box").value;
  userUnits = "metric";
  userApiKey = "99047a288c2f142af21062296db82acc";
  //   logWeather(userCity, userApiKey, userUnits);

  try {
    let weather = await fetchWeather(userCity, userApiKey, userUnits);
    // console.log(weather);
    console.log(userCity);
    console.log(weather.main);
    console.log(weather.desc);
    console.log(weather.temp);
  } catch (error) {
    console.log(error);
  }
}

// logWeather();

const inputLocationSubmitBtn = document.querySelector("#location-submit-btn");

inputLocationSubmitBtn.addEventListener("click", submit);
