const weatherTitle = document.querySelector(".title");
const degreeNum = document.querySelector(".num");
const inputValue = document.getElementById("myInput");
const btnSearch = document.querySelector("button");
const weatherDescribe = document.querySelector(".describe");
const image = document.querySelector("img");

let apiQuotes = [];

// Get weather data from openweathermap public api
async function getData() {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&APPID=e3c39c194b296595a62d9ac63424beae`;
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    //console.log(apiQuotes);
    weatherTitle.textContent = apiQuotes.name;
    degreeNum.textContent = `${apiQuotes.main.temp}C`;
    weatherDescribe.textContent = apiQuotes.weather[0].description;
    const photos =
      "https://api.openweathermap.org/img/w/" +
      apiQuotes.weather[0].icon +
      ".png";
    image.setAttribute("src", photos);
    image.appendChild(image);
  } catch (err) {
    //   alert("Wrong city name!");
  }
}

// Evenet Listener
btnSearch.addEventListener("click", getData);

getData();
