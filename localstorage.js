
import { peps, result } from './script.js';
import { displayPeopleBirthdayList } from "./display.js";

  //Local storage function

  function setItemOfBirthdayToLocalStorage() {
    localStorage.setItem("result", JSON.stringify(result));
  }

  async function restoreFromLocalStorage() {
    console.log("restoring from the local storage");
    let lsItems = JSON.parse(localStorage.getItem("result"));

    //check if the there's something inside the local storage
    if (lsItems) {
      result = lsItems; 
    } else {
      let response = await fetch(`${peps}`);
      let data = await response.json();
      result = [...data];
      displayPeopleBirthdayList(result);
    }
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }

  export { setItemOfBirthdayToLocalStorage, restoreFromLocalStorage };