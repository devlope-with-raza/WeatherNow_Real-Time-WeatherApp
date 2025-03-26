// let apiKey = b8945ea313e5fbbb3df252e66b34dc3e

let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather_date_time");
// let weatherData = document.querySelector(".weather-data");
let w_forcast = document.querySelector(".weather_forcast");
let w_Icon = document.querySelector(".weather_icon");
let Temp = document.querySelector(".weather_temp");
// let minMax = document.querySelector(".weather_minmax");
let min = document.querySelector(".weather_min");
let max = document.querySelector(".weather_max");
let feelsLike = document.querySelector(".weather_feelsLike");
let humadity = document.querySelector(".weather_humadity");
let w_wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather-search");

let getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

let getDateTime = (dt) => {
  let curDate = new Date(dt * 1000);
  console.log(curDate);

  const options1 = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    //   second: "numeric",
  };

  const dateTimeFormat2 = new Intl.DateTimeFormat("en-IN", options1);
  return dateTimeFormat2.format(curDate);
};
let city = "Mumbai";

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  // let city_name = document.querySelector(".weather-search");
  let city_name = document.querySelector(".city-name");
  console.log(city_name.value);
  city = city_name.value;
  getWeatherData();
  city_name.value = "";
});

let getWeatherData = async () => {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8945ea313e5fbbb3df252e66b34dc3e`;

  try {
    let res = await fetch(weatherApi);
    let data = await res.json();
    // console.log(data);
    let { main, name, weather, wind, sys, dt } = data;
    cityName.innerHTML = `${name},${getCountryName(sys.country)}`;
    // dateTime.innerHTML = getDateTime(dt);
    dateTime.innerHTML = getDateTime(Math.floor(Date.now() / 1000));

    w_forcast.innerHTML = weather[0].main;
    w_Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}.png"/>`;

    Temp.innerHTML = `${main.temp}&#176`;
    min.innerHTML = `Min Temp : ${main.temp_min.toFixed()}&#176`;
    max.innerHTML = `Max Temp : ${main.temp_max.toFixed()}&#176`;
    feelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`;
    humadity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};
// getWeatherData();

document.body.addEventListener("load", getWeatherData());
