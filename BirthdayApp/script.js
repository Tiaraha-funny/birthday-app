import {
  setItemOfBirthdayToLocalStorage,
  restoreFromLocalStorage,
} from "./localstorage.js";
import { displayPeopleBirthdayList, displayList } from "./display.js";
import { addListOfPeople } from "./add.js";
import { handleClick } from "./click.js";

// import peps from "./people.json"

//Fetch all the people in the list
const peps =
  "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json";

//Drag the elements from the html
const main = document.querySelector("main");
const addBtn = document.querySelector(".add");

const filterForm = document.querySelector(".filter_birthday");
const filterNameInput = document.querySelector("#name");
const filterMonthInput = document.querySelector("#month");
const resetBtn = document.querySelector(".filterbtn");

const resetFilters = (e) => {
  console.log("Do I click it");
  filterForm.reset(e);
  displayPeopleBirthdayList();
};

let result = [];

async function fetchPeople() {
  let response = await fetch(peps);
  let data = await response.json();
  result = data;

  const filterBirthdayByNames = () => {
    console.log("I am here");
    const checkInputName = filterNameInput.value.toLowerCase();
    console.log(checkInputName);
    const filterInputName = result.filter(
      (name) =>
        name.firstName.toLowerCase().includes(checkInputName) ||
        name.lastName.toLowerCase().includes(checkInputName)
    );
    displayList(filterInputName);
  };

  const filterBirthdayByMonths = () => {
    const checkSelectMonth = filterMonthInput.value;
    const filterSelectMonth = result.filter((month) => {
      const fullMonth = new Date(month.birthday).toLocaleString("en-US", {
        month: "long",
      });
      return fullMonth.toLowerCase().includes(checkSelectMonth);
    });
    displayList(filterSelectMonth);
  };

  displayPeopleBirthdayList(result);
  main.dispatchEvent(new CustomEvent("itemUpdated"));

  restoreFromLocalStorage(result);

  window.addEventListener("click", handleClick);
  addBtn.addEventListener("click", addListOfPeople);

  filterNameInput.addEventListener("input", filterBirthdayByNames);
  filterMonthInput.addEventListener("change", filterBirthdayByMonths);

  resetBtn.addEventListener("click", resetFilters);

  main.addEventListener("itemUpdated", setItemOfBirthdayToLocalStorage);
  restoreFromLocalStorage();
}

fetchPeople();

export { fetchPeople, peps, result, main, addBtn };
