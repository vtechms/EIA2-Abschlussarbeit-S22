namespace FarmSimulator {
  let inputs: HTMLCollectionOf<HTMLInputElement>;

  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    inputs = document.getElementById("prices").getElementsByTagName("input");

    let button: HTMLElement = document.querySelector("button#start");
    button.addEventListener("click", setMarketPrices);
  }

  function setMarketPrices(_event: Event): void {
    if (isValidateInput()) {
      for (let i: number = 0; i < inputs.length; i++) {
        localStorage.setItem(inputs[i].id, inputs[i].value);
      }
      window.location.href = "./simulated-farm.html";
    }
  }

  function isValidateInput(): boolean {
    let isValid: boolean = true;

    let validationMessage: string =
      "Invalid input. For each field, min must be greater than max, " +
      "and both values must not be NaN. " +
      "Fields with invalid input are: ";
    for (let i: number = 0; i < inputs.length; i += 2) {
      let min: number = parseInt(inputs[i].value);
      let max: number = parseInt(inputs[i + 1].value);
      if (min >= max || isNaN(min) || isNaN(max)) {
        isValid = false;
        let item: string = inputs[i].id.substring(
          0,
          inputs[i].id.lastIndexOf("-")
        );
        validationMessage += `<br>${item} (min: ${inputs[i].value}, max: ${
          inputs[i + 1].value
        })`;
      }
    }

    if (!isValid) {
      let invalidInput: HTMLElement = document.querySelector("#invalid-input");
      invalidInput.innerHTML = validationMessage;
    }

    return isValid;
  }
}
