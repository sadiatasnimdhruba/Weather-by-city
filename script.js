let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let feelsLike = document.querySelector('.feels');
let Humidity = document.querySelector('.humidity');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature');
let current = document.querySelector('.current');
let tempicon = document.getElementById("temp-icon");
let temperatureSpan = document.querySelector('.temperature span');
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', (e) => {

  getWeather(searchInput.value);
  searchInput.value = '';

  e.preventDefault();


});


const getWeather = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab3af44de7d24ae7ff86549334e45bd`,

      { mode: 'cors' }
    );
    const data = await response.json();
    console.log(data);
    const { name } = data;
    const { temp, humidity, feels_like } = data.main;
    const { id, description } = data.weather[0];
    locationTimezone.textContent = name;
    current.textContent = ' ';
    temperatureDegree.textContent = Math.floor(temp - 273) + '°C';
    temperatureDescription.textContent = description;
    Humidity.textContent = ' Humidity :' + humidity + '%';
    feelsLike.textContent = 'Feels like :' + Math.floor(feels_like - 273) + '°C';
    feelsLike.style.fontSize = "x-large";
    Humidity.style.fontSize = "x-large";
    feelsLike.style.fontWeight = "bold";
    Humidity.style.fontWeight = "bold";


    if (id < 300 && id > 200) {
      tempicon.src = "./icons/thunderstorm.svg";
    }
    else if (id < 400 && id > 300) {
      tempicon.src = "./icons/cloud.svg";
    }
    else if (id < 600 && id > 500) {
      tempicon.src = "./icons/rain.svg";
    }
    else if (id < 700 && id > 600) {
      tempicon.src = "./icons/snow.svg"
    }
    else if (id < 800 && id > 700) {
      tempicon.src = "./icons/clouds.svg"
    }
    else if (id == 800) {
      tempicon.src = "./icons/clouds-and-sun.svg"
    }
    else if (id > 800) {
      tempicon.src = "./icons/cloud.svg"
    }



  }
  catch (error) {
    //alert('city not found');
    locationTimezone.textContent = 'City not found :-(';
    temperatureDegree.textContent = '';
    temperatureDescription.textContent = '';
    Humidity.textContent = '';
    feelsLike.textContent = '';
    tempicon.src = "!.png";
    current.textContent = ' ';
  }

};
let now = new Date();
let date = document.querySelector('.date');
date.innerText = dateBuilder(now);
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month}, ${year}`;
}




window.addEventListener("load", () => {

  let long;
  let lat;

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {



      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dab3af44de7d24ae7ff86549334e45bd     `

      fetch(api).then((response) => {

        return response.json();


      })
        .then(data => {
          const { name } = data;
          const { temp, humidity, feels_like } = data.main;
          const { id, description } = data.weather[0];
          locationTimezone.textContent = name;
          current.textContent = "***This is your current location***";
          temperatureDegree.textContent = Math.floor(temp - 273) + '°C';
          temperatureDescription.textContent = description;
          Humidity.textContent = ' Humidity :' + humidity + '%';
          feelsLike.textContent = 'Feels like :' + Math.floor(feels_like - 273) + '°C';
          feelsLike.style.fontSize = "x-large";
          Humidity.style.fontSize = "x-large";
          feelsLike.style.fontWeight = "bold";
          Humidity.style.fontWeight = "bold";

          if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstorm.svg";
          }
          else if (id < 400 && id > 300) {
            tempicon.src = "./icons/cloud.svg";
          }
          else if (id < 600 && id > 500) {
            tempicon.src = "./icons/rain.svg";
          }
          else if (id < 700 && id > 600) {
            tempicon.src = "./icons/snow.svg"
          }
          else if (id < 800 && id > 700) {
            tempicon.src = "./icons/clouds.svg"
          }
          else if (id == 800) {
            tempicon.src = "./icons/clouds-and-sun.svg"
          }



          console.log(data);
        })



    }



    )
  }


})          
