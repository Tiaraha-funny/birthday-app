
import { peps, result, main, updateResult } from "./script.js";
import { displayPeopleBirthdayList } from "./display.js";

  //Local storage function

  function setItemOfBirthdayToLocalStorage() {
    localStorage.setItem("result", JSON.stringify(result));
  }

  async function restoreFromLocalStorage() {
    let lsItems = JSON.parse(localStorage.getItem("result"));

    //check if the there's something inside the local storage
    if (lsItems) {
    updateResult(lsItems)
    main.dispatchEvent(new CustomEvent("itemUpdated"));
     
    } else {
      let response = await fetch(`${peps}`);
      let data = await response.json();
      updateResult([...data])
      displayPeopleBirthdayList(result);
    }
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }

  export { setItemOfBirthdayToLocalStorage, restoreFromLocalStorage };