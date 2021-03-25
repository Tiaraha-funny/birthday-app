import {
  setItemOfBirthdayToLocalStorage,
  restoreFromLocalStorage,
} from "./localstorage.js";
import { displayPeopleBirthdayList } from "./display.js";
import { addListOfPeople } from "./add.js";
import { handleClick } from "./click.js";
import { filterByNamesAndMonths } from "./filterNameAndMonth.js";

const peps =
  "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json";

//Drag the elements from the html
const main = document.querySelector("main");
const addBtn = document.querySelector(".add");

const filterNameInput = document.querySelector("#name");
const filterMonthInput = document.querySelector("#month");

let result = [];

async function fetchPeople() {
  let response = await fetch(peps);
  let data = await response.json();
  result = data;

  displayPeopleBirthdayList(result);
  main.dispatchEvent(new CustomEvent("itemUpdated"));

  restoreFromLocalStorage(result);

  window.addEventListener("click", handleClick);
  addBtn.addEventListener("click", addListOfPeople);

  filterNameInput.addEventListener("input", filterByNamesAndMonths);
  filterMonthInput.addEventListener("change", filterByNamesAndMonths);

  main.addEventListener("itemUpdated", setItemOfBirthdayToLocalStorage);
  restoreFromLocalStorage();
}

fetchPeople();

export { fetchPeople, peps, result, main, addBtn, filterMonthInput, filterNameInput };
