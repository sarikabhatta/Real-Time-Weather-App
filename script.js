document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementsByClassName("class-form")[0];
  const input = document.getElementsByClassName("class-input")[0];

  if (form && input) {
    let isSubmitting = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission
      if (!isSubmitting) {
        console.log(input.value); // Log the input value to the console
      }
      isSubmitting = false;
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        isSubmitting = true;
        form.dispatchEvent(new Event("submit"));
      }
    });
  } else {
    console.error("Input or form not found");
  }
});
