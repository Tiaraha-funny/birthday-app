import { setItemOfBirthdayToLocalStorage, restoreFromLocalStorage } from "./localstorage.js" ;
import { displayPeopleBirthdayList } from "./display.js";
import { addListOfPeople } from "./add.js";
import { handleClick } from "./click.js";


//Fetch all the people in the list
const peps = "http://127.0.0.1:5500/people.json";

//Drag the elements from the html
const main = document.querySelector("main");
const addBtn = document.querySelector(".add");

let result = [];

async function fetchPeople() {
  let response = await fetch(peps);
  let data = await response.json();
  result = data;

  // restoreFromLocalStorage(result);
  displayPeopleBirthdayList(result);
  main.dispatchEvent(new CustomEvent("itemUpdated"));


  window.addEventListener("click", handleClick);
  addBtn.addEventListener("click", addListOfPeople);
  main.addEventListener("itemUpdated", setItemOfBirthdayToLocalStorage);
  displayPeopleBirthdayList();
  restoreFromLocalStorage();
}

fetchPeople();

export { fetchPeople, peps, result, main, addBtn };