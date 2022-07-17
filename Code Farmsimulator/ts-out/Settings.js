var FarmSimulator;
(function (FarmSimulator) {
    let inputs;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        inputs = document.getElementById("prices").getElementsByTagName("input");
        let button = document.querySelector("button#start");
        button.addEventListener("click", setMarketPrices);
    }
    function setMarketPrices(_event) {
        if (isValidateInput()) {
            for (let i = 0; i < inputs.length; i++) {
                localStorage.setItem(inputs[i].id, inputs[i].value);
            }
            window.location.href = "./simulated-farm.html";
        }
    }
    function isValidateInput() {
        let isValid = true;
        let validationMessage = "Invalid input. For each field, min must be greater than max, " +
            "and both values must not be NaN. " +
            "Fields with invalid input are: ";
        for (let i = 0; i < inputs.length; i += 2) {
            let min = parseInt(inputs[i].value);
            let max = parseInt(inputs[i + 1].value);
            if (min >= max || isNaN(min) || isNaN(max)) {
                isValid = false;
                let item = inputs[i].id.substring(0, inputs[i].id.lastIndexOf("-"));
                validationMessage += `<br>${item} (min: ${inputs[i].value}, max: ${inputs[i + 1].value})`;
            }
        }
        if (!isValid) {
            let invalidInput = document.querySelector("#invalid-input");
            invalidInput.innerHTML = validationMessage;
        }
        return isValid;
    }
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Settings.js.map