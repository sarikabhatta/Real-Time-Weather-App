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
      const fiveDaysForecast = data.list.filter((forecast) => {
        // access dt_txt property of forecast object, here forecast object is the parsed json
        const forecastDate = new Date(forecast.dt_txt).getDate(); //forecastDate = 12

        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });

      console.log(fiveDaysForecast);
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
