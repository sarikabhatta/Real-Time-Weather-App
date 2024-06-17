// "DOMContentLoaded" event ensures that the html elements are fully loaded and then only the handler function executes
// if we do not use this then if the script runs before the DOM is fully loaded, it might not find the elements (form and input), leading to errors.

// document.addEventListener("DOMContentLoaded", (event) => {
//   const form = document.getElementsByClassName("form-class")[0];
//   const input = document.getElementsByClassName("input-class")[0];

//   if (form && input) {
//     let isSubmitting = false;

//     form.addEventListener("submit", (event) => {
//       event.preventDefault(); // Prevent the default form submission
//       if (!isSubmitting) {
//         console.log(input.value); // Log the input value to the console
//       }
//       isSubmitting = false;
//     });

//     input.addEventListener("keydown", (event) => {
//       if (event.key === "Enter") {
//         isSubmitting = true;
//         // submit event is triggered
//         form.dispatchEvent(new Event("submit"));
//       }
//     });
//   } else {
//     console.error("Input or form not found");
//   }
// });

const API_KEY = "ec9a6b06eb6b6160e6eb69255a9a1dcd";

const formInput = document.querySelector(".input-class");
const individualForecast = document.querySelector(".ul-class");

const temperatureContainer = document.querySelector(".temperature-container");
const mainImageContainer = document.querySelector(".main-image-container");

const createIndividualForecast = (element) => {
  return ` <li class="individual-forecast">
            <p>${element.dt_txt.split(" ")[0]} </p> 
            <img
              src="https://openweathermap.org/img/wn/${
                element.weather[0].icon
              }@2x.png"
              alt="weather icon img"
            />
            <p>${element.main.temp.toFixed(2)}°C</p>
          </li>
  `;
};

const fillTemperatureContainer = (city, chanceOfRain, currentTemperature) => {
  return ` <h1>${city}</h1>
            <p>Chance of Rain: ${chanceOfRain}</p>
            <h1>${currentTemperature}°C</h1>

  `;
};

const fillMainImageContainer = (mainImage, weatherDescription) => {
  return `<img
  src="https://openweathermap.org/img/wn/${mainImage}@2x.png"
  alt="weather icon img"
/>
<p>${weatherDescription}</p>
`;
};

// define an event handler function
function handleInput(event) {
  // prevent default behavior of enter key ie, prevent default form submission
  event.preventDefault();

  const cityName = formInput.value;

  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;

  fetch(WEATHER_API_URL)
    .then((response) => response.json())
    .then((data) => {
      // parsed json is kept in newElement so we can use it to other part of code too? ... check here about variable scope
      newElement = data;

      console.log(newElement);
      addDetailsInRHS();
      addDetailsInTemperatureContainer();
      addDetailsInMainImage();
    })
    .catch(() => {
      alert("An error occurred while trying to fetch data from api");
    });
}

// register event listener to the event source ie, html element here
formInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleInput(event);
  }
});

function addDetailsInTemperatureContainer() {
  const chanceOfRain = newElement.list[0].pop * 100 + "%";
  const city = newElement.city.name;
  const currentTemperature = newElement.list[0].main.temp;

  // add html element to temperatureContainer div-- here html is return value of the function
  temperatureContainer.innerHTML = fillTemperatureContainer(
    city,
    chanceOfRain,
    currentTemperature
  );
}

// function addDetailsInMainImage() {
//   const mainImage = newElement.list[0].weather[0].icon;
//   const weatherDescription =
//     newElement.list[0].weather[0].description.split(" ");
//   // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//   // .join(" ");

//   console.log(weatherDescription);

//   // mainImageContainer.innerHTML = fillMainImageContainer(
//   //   mainImage,
//   //   weatherDescription
//   // );
// }

function addDetailsInRHS() {
  const uniqueForecastDays = [];
  // fiveDaysForecast is an array returned by the filter() method
  const fiveDaysForecast = newElement.list.filter((forecast) => {
    // access dt_txt property of forecast object, here forecast object is the parsed json

    const forecastDate = new Date(forecast.dt_txt).getDate(); //forecastDate = 12

    // this if is always executed for every argument in the callback
    if (!uniqueForecastDays.includes(forecastDate)) {
      // NOTE: number is a truthy value
      return uniqueForecastDays.push(forecastDate);
    } else {
      return false;
    }
  });
  individualForecast.innerHTML = " "; // setting innerHTML to empty of the parent element ie ul will remove all its child element

  // add html element
  fiveDaysForecast.forEach((element) => {
    individualForecast.insertAdjacentHTML(
      "beforeend",
      createIndividualForecast(element)
    );
  });
}
