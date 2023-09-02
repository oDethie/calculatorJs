const calculoNumber = [];

const display = document.querySelector("[data-calc='display']");

const numeros = Array.from(document.querySelectorAll("[ data-calc='number']"));

const operacao = Array.from(
  document.querySelectorAll("[ data-calc='operacao']")
);

const miniDisplay = document.querySelector("[data-calc='mini-display']");

const apagaTudo = document.querySelector("[data-calc='ac']");

const equal = document.querySelector("[data-calc='equal']");

const del = document.querySelector("[data-calc='delete']");

const calculaDisplay = (display) => {
  const displayTam = display.value;
  return displayTam.length;
};

const mostreRes = () => {
  calculoNumber.forEach((ele, index) => {
    if (ele === "RAIZ") {
      let i = index - 1;
      const op1 = Number(calculoNumber[i]);
      calculoNumber.splice(i, 2, Math.sqrt(op1).toString());
    } else {
      if (ele === "/" || ele === "x") {
        let i = index - 1;
        let j = index + 1;
        const op1 = Number(calculoNumber[i]);
        const op2 = Number(calculoNumber[j]);
        let res;

        switch (ele) {
          case "/":
            res = op1 / op2;
            calculoNumber.splice(i, 3, res.toString());
            break;

          case "x":
            res = op1 * op2;
            calculoNumber.splice(i, 3, res.toString());
            break;
        }
      } else {
        let i = index - 1;
        let j = index + 1;
        const op1 = Number(calculoNumber[i]);
        const op2 = Number(calculoNumber[j]);
        let res;

        switch (ele) {
          case "+":
            res = op1 + op2;
            calculoNumber.splice(i, 3, res.toString());
            break;

          case "-":
            res = op1 - op2;
            calculoNumber.splice(i, 3, res.toString());
            break;
        }
      }
    }
  });
  if (calculoNumber.length !== 1) mostreRes();
};

numeros.forEach((num) => {
  num.addEventListener("click", (event) => {
    event.preventDefault();
    if (calculaDisplay(display) < 12) {
      display.value += `${event.target.value}`;
    }
  });
});

operacao.forEach((op) => {
  op.addEventListener("click", (event) => {
    event.preventDefault();
    if (calculaDisplay(display) !== 0) {
      calculoNumber.push(display.value);
      display.value = "";
      miniDisplay.textContent = event.target.value;
      calculoNumber.push(event.target.value);
    } else if (
      calculaDisplay(display) === 0 &&
      miniDisplay.textContent.length >= 1
    ) {
      calculoNumber.pop();
      miniDisplay.textContent = event.target.value;
      calculoNumber.push(event.target.value);
    }
  });
});

apagaTudo.addEventListener("click", (event) => {
  event.preventDefault();
  display.value = "";
  miniDisplay.textContent = "";
  calculoNumber.splice(0, --calculoNumber.length);
});

equal.addEventListener("click", (event) => {
  event.preventDefault();
  if (calculoNumber.length >= 2 && calculaDisplay(display) !== 0) {
    calculoNumber.push(display.value);
    mostreRes();
    display.value = calculoNumber.pop();
    miniDisplay.textContent = "";
  } else {
    if (miniDisplay.textContent === "RAIZ") {
      mostreRes();
      display.value = calculoNumber.pop();
      miniDisplay.textContent = "";
    }
  }
});

del.addEventListener("click", event => {
  event.preventDefault();
  const stringDel = display.value;
  if(stringDel.length >= 1){
    display.value = stringDel.slice(0, stringDel.length-1);
  }
})