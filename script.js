const signupForm = document.querySelector(".signup__form");

const showError = function (element) {
  const errorMessage = element
    .closest(".signup__form--input-error")
    .querySelector(".error__text");
  const errorIcon = element
    .closest(".signup__form--input-container")
    .querySelector(".error__icon");

  if (element.validity.valueMissing) {
    errorMessage.textContent = `${element.placeholder} cannot be empty`;
  }

  if (element.validity.typeMismatch) {
    errorMessage.textContent = `Looks like this is not an ${element.type}`;
  }

  if (element.validity.tooShort) {
    errorMessage.textContent = `Entered ${element.placeholder} is too short`;
  }

  errorMessage.classList.remove("hidden");
  errorIcon.classList.remove("hidden");
};

const hideError = function (element) {
  const errorMessage = element
    .closest(".signup__form--input-error")
    .querySelector(".error__text");
  const errorIcon = element
    .closest(".signup__form--input-container")
    .querySelector(".error__icon");

  errorIcon.classList.add("hidden");
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";
};

signupForm.addEventListener("input", function (e) {
  const input = e.target;

  if (input.validity.valid) {
    hideError(input);
    return;
  }

  showError(input);
});

signupForm.addEventListener("submit", function (e) {
  const inputsArray = [...this.querySelectorAll(".signup__form--input")];

  if (inputsArray.every((input) => input.validity.valid)) {
    console.log("Every input is valid!");
    inputsArray.forEach((input) => {
      input.value = "";
      hideError(input);
    });

    e.preventDefault();
    return;
  }

  inputsArray.forEach((input) => {
    if (!input.validity.valid) {
      showError(input);
    }
  });

  console.log("Some of the inputs are invalid!");
  e.preventDefault();
});
