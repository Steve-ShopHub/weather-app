function getWeatherIcon(dayStatus, main) {
  let day = dayStatus;
  let time;

  day ? (time = "d") : (time = "n");

  let iconNumber;
  let icon;

  if (main === "clear sky") {
    iconNumber = "01";
  } else if (main === "few clouds") {
    iconNumber = "02";
  } else if (main === "scattered clouds") {
    iconNumber = "03";
  } else if (main === "broken clouds") {
    iconNumber = "04";
  } else if (main === "shower rain") {
    iconNumber = "09";
  } else if (main === "rain") {
    iconNumber = "10";
  } else if (main === "thunderstorm") {
    iconNumber = "11";
  } else if (main === "snow") {
    iconNumber = "13";
  } else if (main === "mist") {
    iconNumber = "50";
  } else {
    iconNumber = ""; // If mainription does not match any of the icons, return an empty string
  }

  let iconUrl;
  iconUrl = `https://openweathermap.org/img/wn/${iconNumber}${time}.png`;

  return iconUrl;
}
