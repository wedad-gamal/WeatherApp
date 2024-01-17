const todayDate = document.querySelector(".today-date");
const todayDay = document.querySelector(".today-day");
const forcastDay1 = document.querySelector(".forcast-day1");
const forcastDay2 = document.querySelector(".forcast-day2");
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const locationTitle = document.querySelector(".location");
const tempNow = document.querySelector(".temp-now");
const todayIcon = document.querySelector(".large-icon-container img");
const textToday = document.querySelector(".today .describe-temp");

const forcast1Icon = document.querySelector(
  ".forecast1 .meduim-icon-container img"
);
const forcast1Text = document.querySelector(".forecast1 .describe-temp");
const forcast1highTemp = document.querySelector(".forecast1 .high-temp");
const forcast1lowTemp = document.querySelector(".forecast1 .low-temp");

const forcast2Icon = document.querySelector(
  ".forecast2 .meduim-icon-container img"
);
const forcast2Text = document.querySelector(".forecast1 .describe-temp");
const forcast2highTemp = document.querySelector(".forecast2 .high-temp");
const forcast2lowTemp = document.querySelector(".forecast2 .low-temp");

const findBtn = document.getElementById("findBtn");
const locationInput = document.querySelector("#locationInput");

getGeolocation();

locationInput.addEventListener("keyup", function () {
  getDateValues();
  getTemp(locationInput.value);
});

findBtn.addEventListener("click", function () {
  getDateValues();
  getTemp(locationInput.value);
});

function convertToDegree(temp) {
  return `${temp}&deg;C `;
}

function getGeolocation() {
  getDateValues();
  if (navigator.geolocation) {
    let geolocation = navigator.geolocation.getCurrentPosition(function (
      position
    ) {
      let q = `${position.coords.latitude},${position.coords.longitude}`;
      getTemp(q);
      console.log("q: ", q );
    });
  } else {
    getTemp("cairo");
  }
}

function getTempValues(result) {
  locationTitle.textContent = result.location.name;
  tempNow.innerHTML = convertToDegree(result.current.temp_c);
  todayIcon.setAttribute("src", result.current.condition.icon);
  textToday.textContent = result.current.condition.text;

  const forecast1 = result.forecast.forecastday[1].day;
  forcast1Icon.setAttribute("src", forecast1.condition.icon);
  forcast1Text.textContent = forecast1.condition.text;
  forcast1lowTemp.innerHTML = convertToDegree(forecast1.mintemp_c);
  forcast1highTemp.innerHTML = convertToDegree(forecast1.maxtemp_c);

  const forecast2 = result.forecast.forecastday[2].day;
  forcast2Icon.setAttribute("src", forecast2.condition.icon);
  forcast2Text.textContent = forecast2.condition.text;
  forcast2lowTemp.innerHTML = convertToDegree(forecast2.mintemp_c);
  forcast2highTemp.innerHTML = convertToDegree(forecast2.maxtemp_c);
}

function getDateValues() {
  let date = new Date();
  console.log("date: ", date);
  let currentDay = dayNames[date.getDay()];
  todayDay.textContent = currentDay;
  let currentMonth = monthNames[date.getMonth()];

  let currentDate = `${date.getDate()} ${currentMonth}`; //14January
  todayDate.textContent = currentDate;

  let forecast1Day = dayNames[date.getDay() + 1];
  let forecast2Day = dayNames[date.getDay() + 2];

  forcastDay1.textContent = forecast1Day;
  forcastDay2.textContent = forecast2Day;
}

async function getTemp(location) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4ab208ef6e3d46e388e233419241001&q=${location}&days=3`
  );
  let result = await data.json();
  getTempValues(result);
}
