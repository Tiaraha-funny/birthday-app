import { peps, result, main, updateResult } from "./script.js";
import { displayList } from "./display.js";

  //Local storage function

  function setItemOfBirthdayToLocalStorage() {
    localStorage.setItem("result", JSON.stringify(result));
  }

  async function restoreFromLocalStorage() {
    let lsItems = JSON.parse(localStorage.getItem("result"));
    // updateResult(lsItems)
    //check if the there's something inside the local storage
    if (lsItems) {
    main.dispatchEvent(new CustomEvent("itemUpdated"));
     
    } else {
      let response = await fetch(`${peps}`);
      let data = await response.json();
      displayList([...data]);
      main.dispatchEvent(new CustomEvent("itemUpdated"));
    }
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }

  export { setItemOfBirthdayToLocalStorage, restoreFromLocalStorage };