
import { peps, result, main } from "./script.js";
import { displayPeopleBirthdayList } from "./display.js";

  //Local storage function

  function setItemOfBirthdayToLocalStorage() {
    localStorage.setItem("result", JSON.stringify(result));
    console.log("setItem",localStorage);
  }

  async function restoreFromLocalStorage() {
    let lsItems = JSON.parse(localStorage.getItem("result"));
    console.log("list items", lsItems);

    //check if the there's something inside the local storage
    if (lsItems) {
     let result = lsItems;
     console.log("result in local storage", result);
     result;
    } else {
      let response = await fetch(`${peps}`);
      let data = await response.json();
      let result = [...data];
      displayPeopleBirthdayList(result);
    }
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }

  export { setItemOfBirthdayToLocalStorage, restoreFromLocalStorage };