// add.js

import { result, main } from "./script.js";
import { displayList } from "./display.js";
import { destroyModalEditDeleteOrCancel } from "./destroy.js";

function addListOfPeople(id) {
  return new Promise(function (resolve) {
      
    console.log("I want to add this list");

    const popup = document.createElement("form");
    popup.classList.add("person");
    result.find((person) => person.id !== id);
    
    const addHtml = `
    <div class="wrapper">
      <div class="form">
        <h2>Do you want to add this lists?</h2>
        <label>Enter the last Name</label>
        <input type="text" name="lastName" id="lastName"><br>
        <label>Enter the first name</label>
        <input type="text" name="firstName" id="firstName"><br>
        <label>Enter the birthday</label>
        <input type="date" max=${new Date().toISOString().slice(0, 10)} name="birthday" id="birthday"><br>
        <div class="buttons">
          <button type="submit addBtn" class="sub">Submit</button>
          <button type="button" id="close-button-cancel" name="cancel" class="cancel">Cancel</button>
        </div>
      </div>
      <button id="close-button-x" class="closeButton"><small>X</samll></button>
    </div>
  `;
    // main.insertAdjacentHTML("beforeend", addHtml)
    popup.innerHTML = addHtml;

    const closeButtonX = popup.querySelector("#close-button-x");
    const closeButtonCancel = popup.querySelector("#close-button-cancel");

    closeButtonCancel.addEventListener("click", (e) => {
      console.log("click on cancel");
      destroyModalEditDeleteOrCancel(popup);
    })

    closeButtonX.addEventListener("click", (e) => {
      console.log("click on cancel");
      destroyModalEditDeleteOrCancel(popup);
    })

    resolve();

    popup.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("This is the submit");

      console.log(result);
      const formEl = e.currentTarget;

      const newBirthday = {
        picture: "https://picsum.photos/id/1/200/300",
        lastName: formEl.lastName.value,
        firstName: formEl.firstName.value,
        birthday: formEl.birthday.value,
        id: Date.now(),
      };
      
      result.unshift(newBirthday);
      displayList();
      destroyModalEditDeleteOrCancel(popup);
      main.dispatchEvent(new CustomEvent("itemUpdated"));
      formEl.reset();
    });

      resolve(document.body.appendChild(popup));
      popup.classList.add("open");
      main.dispatchEvent(new CustomEvent("itemUpdated"));

    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        popup.classList.remove("open");
      }
    });
  });

  // if(popup.closeButton)
}

export { addListOfPeople };

// ----------------\\------------------

//  display.js

import { result, main, updateResult } from "./script.js";
import { editSvg, deleteSvg } from "./icons-SVGs/svg.js";

// Maping all the people in the list from the fetch function

function calculateDaysToBirthday(array) {
  updateResult(array)
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  array.forEach((person) => {
    let daysBirth = new Date(person.birthday).toISOString().slice(4);
    // console.log("person.birthday", new Date(person.birthday));
    daysBirth = today.getFullYear() + daysBirth;
    const daysToBirthday = Math.round(
      (new Date(daysBirth) - new Date(today)) / oneDay
    );

    person.daysToBirthday =
      daysToBirthday < 0 ? daysToBirthday + 365 : daysToBirthday;
  });
}

const htmlGenerator = (array) => {
  return array
    .map((person) => {
      function getSymboleDate(date) {
        if (date < 3 && date > 31) return "th";
        switch (day % 2) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }

      var birthDate = new Date(person.birthday);
      var day = birthDate.getDay();

      let month;

      // to get the date and the months
      let dateOfBirth = new Date(person.birthday).getDate();

      let monthOfBirth = new Date(person.birthday).getMonth();

      switch (monthOfBirth) {
        case 0:
          month = "January";
          break;
        case 1:
          month = "February";
          break;
        case 2:
          month = "March";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
        case 7:
          month = "August";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "October";
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "December";
      }
      // calculate days
      let today = new Date();
      let year;

      // if the current month is bigger than the month of birth, then add one more month
      if (today.getMonth() > monthOfBirth) {
        year = today.getFullYear() + 1;
      } else if (
        today.getMonth() === monthOfBirth &&
        today.getDate() > dateOfBirth
      ) {
        year = today.getFullYear();
      } else {
        // the same as the before
        year = today.getFullYear();
      }
      // calculate the day of birth
      let daysBirth = new Date(year, monthOfBirth, dateOfBirth);

      let age =
        new Date().getFullYear() - new Date(person.birthday).getFullYear();

      if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
        daysBirth.setFullYear(daysBirth.getFullYear() + 1);
        age =
          new Date().getFullYear() +
          1 -
          new Date(person.birthday).getFullYear();
      }

      return `
      <ul data-id="${
        person.id
      }" class="d-flex flex-row justify-content-around list-unstyled">
        <li class="">
          <img class="rounded-circle" src="${person.picture}" alt="images"/>
          <p class="names"><b>${person.lastName} ${person.firstName}</b><br>
            <span class="span">Turns 
              <span class="age"> ${age} </span> on ${month}  
              </sup>${dateOfBirth}<sup> ${getSymboleDate(daysBirth)}
            </span>
          </p>
        <li>
          <span class="span">In ${person.daysToBirthday} Days</span>
          <div class="buttons">
            <div class="edit">
              <button type="button" name="edit" class="edit">${editSvg}</button>
            </div>
            <div class="delete">
              <button type="button" class="delete">${deleteSvg}</button>
            </div>
          </div>
        </li>
      </ul>
    `;
    })
    .join("");
};

function displayList() {
  calculateDaysToBirthday(result);
  const sortedArray = result.sort(
    (personA, personB) => personA.daysToBirthday - personB.daysToBirthday
  );

  updateResult(sortedArray);
  console.log(sortedArray);
  const html = htmlGenerator(sortedArray);
  main.innerHTML = html;
  main.dispatchEvent(new CustomEvent("itemUpdated"));
}

export { displayList };

// ------------------------------------------------
// filter.js


import { displayList } from "./display.js";
import { result, filterNameInput, filterMonthInput, updateResult } from "./script.js";

const filterBirthdayByNames = (people) => {
    const checkInputName = filterNameInput.value.toLowerCase();
    console.log(checkInputName);
    const filterInputName = people.filter(
      (name) =>
        name.firstName.toLowerCase().includes(checkInputName) ||
        name.lastName.toLowerCase().includes(checkInputName)
    );
    return filterInputName;
  };

const filterBirthdayByMonths = (people) => {
    const checkSelectMonth = filterMonthInput.value;
    const filterSelectMonth = people.filter((month) => {
        if(checkSelectMonth === "all") {
            return true
        }
      const fullMonth = new Date(month.birthday).toLocaleString("en-US", {
        month: "long",
      });
      return fullMonth.toLowerCase().includes(checkSelectMonth);
    });
    return filterSelectMonth;
  };

export const filterByNamesAndMonths = () => {
  displayList(filterBirthdayByMonths(filterBirthdayByNames(result)));      
  }

// ----------------------------------
// script.js


import {
    setItemOfBirthdayToLocalStorage,
    restoreFromLocalStorage,
  } from "./localstorage.js";
  import { displayList } from "./display.js";
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
  
  export function updateResult(newResult) {
    result = newResult
  }
  
  async function fetchPeople() {
  
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  
    let response = await fetch(peps);
    let data = await response.json();
    result = data;
    // updateResult(data);
    displayList(result);
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
  
// -------------------------------------------------------------------------  