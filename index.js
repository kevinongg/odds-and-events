// === State ===
// Track numbers stored in Bank
let bankNumbers = [];
// Track numbers stored in Odds
let oddNumbers = [];
// Track numbers stored in Evens
let evenNumbers = [];

// === Functions for the buttons ===
// Add to bank function
const addToBank = (num) => {
  bankNumbers.push(num);
  return bankNumbers;
};

// console.log(addToBank(6));
// console.log(bankNumbers);

// Function to sort one number to even or odd
const sortOne = () => {
  if (bankNumbers.length === 0) {
    return;
  }
  const firstBankNumber = bankNumbers.shift();
  if (firstBankNumber % 2 === 0) {
    evenNumbers.push(firstBankNumber);
  } else {
    oddNumbers.push(firstBankNumber);
  }
};

// Function to sort all if more than 1 number
const sortAll = () => {
  while (bankNumbers.length > 0) {
    sortOne();
  }
};

// === Components ===
// Form that allows user to add numbers, sort, and sort all numbers
const addNumberForm = () => {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" min="0" style="padding:1rem" />
    </label>
    <button id="add" type="submit">Add number</button>
    <button id="sortOne" type="button">Sort 1</button>
    <button id="sortAll" type="button">Sort All</button>
  `;
  // ***Event Listeners***
  $form.addEventListener("submit", function (event) {
    event.preventDefault();
    const convertToNum = +$form.number.value;
    addToBank(convertToNum);
    $form.reset();
    render();
  });

  $form.querySelector("#sortOne").addEventListener("click", function () {
    sortOne();
    render();
  });

  $form.querySelector("#sortAll").addEventListener("click", function () {
    sortAll();
    render();
  });

  return $form;
};

// **Box Component**
const inputBox = (arr) => {
  const $box = document.createElement("input");
  $box.classList.add("input-box");
  $box.value = arr.join(" ");
  return $box;
};

// **Section Component**
const section = (title, arr) => {
  const $section = document.createElement("section");
  const $h2 = document.createElement("h2");
  $h2.textContent = title;
  $section.appendChild($h2);
  $section.appendChild(inputBox(arr));
  return $section;
};
// === Render ===
const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <AddNumberForm></AddNumberForm>
    <BankSection></BankSection>
    <OddsSection></OddsSection>
    <EvensSection></EvensSection>
  `;
  $app.querySelector("AddNumberForm").replaceWith(addNumberForm());
  $app.querySelector("BankSection").replaceWith(section("Bank", bankNumbers));
  $app.querySelector("OddsSection").replaceWith(section("Odds", oddNumbers));
  $app.querySelector("EvensSection").replaceWith(section("Evens", evenNumbers));
};
render();
