let setB = [];
let setC = [];

function initializeInputs() {
  const setBContainer = document.getElementById("setBInputs");
  const setCContainer = document.getElementById("setCInputs");

  const setBInput = document.createElement("div");
  setBInput.classList.add("input-container");
  setBInput.innerHTML = `
    <label for="setBElement">Element Number for Set B:</label>
    <input type="number" id="setBElement" placeholder="Enter element number" min="1">
    <label for="setBValue">Value for Set B:</label>
    <input type="number" id="setBValue" min="0" max="1" step="0.1" value="0">
  `;
  setBContainer.appendChild(setBInput);

  const setCInput = document.createElement("div");
  setCInput.classList.add("input-container");
  setCInput.innerHTML = `
    <label for="setCElement">Element Number for Set C:</label>
    <input type="number" id="setCElement" placeholder="Enter element number" min="1">
    <label for="setCValue">Value for Set C:</label>
    <input type="number" id="setCValue" min="0" max="1" step="0.1" value="0">
  `;
  setCContainer.appendChild(setCInput);
}

window.onload = initializeInputs;

function addElementToSets() {
  const setBElement = document.getElementById("setBElement").value;
  const setBValue = parseFloat(document.getElementById("setBValue").value);
  const setCElement = document.getElementById("setCElement").value;
  const setCValue = parseFloat(document.getElementById("setCValue").value);

  if (setBElement && setBValue && !isNaN(setBValue)) {
    setB.push({ element: setBElement, value: setBValue });
  }

  if (setCElement && setCValue && !isNaN(setCValue)) {
    setC.push({ element: setCElement, value: setCValue });
  }

  updateSetLists();

  document.getElementById("setBElement").value = "";
  document.getElementById("setBValue").value = "0";
  document.getElementById("setCElement").value = "";
  document.getElementById("setCValue").value = "0";
}

function updateSetLists() {
  const setBList = document.getElementById("setBList");
  const setCList = document.getElementById("setCList");

  setBList.innerHTML = "";
  setCList.innerHTML = "";

  setB.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Element ${element.element}: ${element.value}`;
    setBList.appendChild(listItem);
  });

  setC.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Element ${element.element}: ${element.value}`;
    setCList.appendChild(listItem);
  });
}

function round(value, precision = 4) {
  return parseFloat(value.toFixed(precision));
}

function calculateAddition() {
  performOperation((a, b) => round(a + b), "+");
}

function calculateMultiplication() {
  performOperation((a, b) => round(a * b), "×");
}

function calculateDivision() {
  performOperation((a, b) => (b !== 0 ? round(a / b) : 0), "÷");
}

function calculateSubtraction() {
  performOperation((a, b) => round(a - b), "-");
}

function performOperation(operation, symbol) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (setB.length === 0 || setC.length === 0) {
    alert("Please add elements to both Set B and Set C before calculating.");
    return;
  }

  let steps = [];

  let combinations = [];
  for (let i = 0; i < setB.length; i++) {
    for (let j = 0; j < setC.length; j++) {
      const combinedElement = operation(
        parseFloat(setB[i].element),
        parseFloat(setC[j].element)
      );
      const minValue = Math.min(setB[i].value, setC[j].value);
      combinations.push({ value: minValue, element: combinedElement });

      steps.push(
        `Step: Min(${setB[i].value}, ${setC[j].value}) = ${minValue}, Element: ${setB[i].element} ${symbol} ${setC[j].element} = ${combinedElement}`
      );
    }
  }

  const groupedResults = combinations.reduce((acc, curr) => {
    if (!acc[curr.element]) {
      acc[curr.element] = curr.value;
    } else {
      acc[curr.element] = Math.max(acc[curr.element], curr.value);
    }
    return acc;
  }, {});

  steps.forEach((step) => {
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step");
    stepDiv.innerHTML = step;
    resultDiv.appendChild(stepDiv);
  });

  const finalResult = Object.keys(groupedResults)
    .map((key) => `Max Value for Element ${key}: ${groupedResults[key]}`)
    .join("<br/>");

  const finalResultDiv = document.createElement("div");
  finalResultDiv.classList.add("step");
  finalResultDiv.innerHTML = `<strong>Final Result:</strong><br/>${finalResult}`;
  resultDiv.appendChild(finalResultDiv);
}
