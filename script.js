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

const fillTemperatureContainer = () => {
  return ` <h1>${formInput.value}</h1>
            <p>Chance of rain: 0%</p>
            <h1>26 degrees</h1>

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
      const uniqueForecastDays = [];
      // fiveDaysForecast is an array returned by the filter() method
      const fiveDaysForecast = data.list.filter((forecast) => {
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

      fiveDaysForecast.forEach((element) => {
        individualForecast.insertAdjacentHTML(
          "beforeend",
          createIndividualForecast(element)
        );
      });

      // for temperature container
      const todayDate = data.list.filter((obj) => {
        const date = new Date().getDate();

        if (date == new Date(obj.dt_txt).getDate()) {
          return true;
        }
      });

      console.log(fiveDaysForecast);
      console.log("Hi", todayDate);

      // todayDate.forEach((element) => {
      //   temperatureContainer.insertAdjacentHTML(
      //     "beforeend",
      //     fillTemperatureContainer(element)
      //   );
      // });
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
