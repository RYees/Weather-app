const weatherTitle = document.querySelector(".title");
const weatherDate = document.querySelector(".date");
const weatherDateName = document.querySelector(".dateName");
const degreeNum = document.querySelector(".num");
const inputValue = document.getElementById("myInput");
const btnSearch = document.querySelector("button");
const weatherDescribe = document.querySelector(".describe");
const image = document.querySelector("img");
const pressureP = document.querySelector(".pressure");
const humidityH = document.querySelector(".humidity");
const weatherCastEl = document.querySelector(".days");
const weatherCurrentEl = document.querySelector(".details");

let apiQuotes = [];

getweatherData();
// currentWeatherData();
function getweatherData() {
//   try {
     navigator.geolocation.getCurrentPosition((success) => {
      // console.log(success);
      let { latitude, longitude } = success.coords;
      let appUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=e3c39c194b296595a62d9ac63424beae`;
      
      
      fetch(appUrl).then(res => res.json()).then(data => {
           console.log(data);
           currentWeatherData(data);
       });
   
    });

}

function currentWeatherData(data) {
  let { temp, humidity, weather, dt, pressure } = data.current;

      weatherTitle.textContent = data.timezone;
      weatherDate.textContent = window.moment(dt * 1000).format("MM/DD/YYYY"); 
      weatherDateName.textContent = window.moment(dt * 1000).format("dddd");
      pressureP.textContent = `${pressure}\u00B0C-Pressure`;
      humidityH.textContent = `${humidity}\u00B0C-Humidity`;
      degreeNum.textContent = `${temp}\u00B0C`;
      weatherDescribe.textContent = weather[0].description;
      const photos =
        "https://api.openweathermap.org/img/w/" +
        weather[0].icon +
        ".png";
      image.setAttribute("src", photos);
    
      let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
        weatherCurrentEl.innerHTML = `
            <div class="details">                
                <div class="pressure">Night - ${day.temp.night}&#176;C</div>
                <div class="humidity">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `;
        }else{          
         otherDayForcast += `
          <div class="weather-forecast">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img class="img1" src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            
          </div>
         `;
      }
    });
    // console.log('output', otherDayForcast);
   weatherCastEl.innerHTML = otherDayForcast;
 
}
// getData();   https://www.youtube.com/watch?v=6trGQWzg2AI
