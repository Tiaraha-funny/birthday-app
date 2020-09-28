
import { result, main } from './script.js';
import { showBirth } from "./filter.js";

  // Maping all the people in the list from the fetch function

  function displayPeopleBirthdayList() {
    const sortedBirthday = result.sort(
      (sooner, later) => later.birthday - sooner.birthday
    );

    showBirth();

    main.innerHTML = sortedBirthday
      .map((person) => {
        function getSymboleDate(date) {
          if (date < 3 && date > 21) return "th";
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

        const getAge = (date1, date2) => {
          // This is a condition like if statement
          date2 = date2 || new Date();
          //Calculation
          const diff = date2.getTime() - date1.getTime();
          return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        };

        const birthdates = getAge(new Date(person.birthday));

        var birthDate = new Date(person.birthday);
        var day = birthDate.getDay();
        var mymonth = birthDate.getMonth();
        var year = birthDate.getFullYear();
        var ageResult = `${year}/${mymonth}/${day}`;

        let month = [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "Aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ][birthDate.getMonth()];

        return `
        <ul data-id="${
          person.id
        }" class="d-flex flex-row justify-content-around list-unstyled">
          <li class=""><img class="rounded-circle" src="${
            person.picture
          }" alt="images"></li>
          <li class="names">${person.lastName} ${
          person.firstName
        }<br>Turns ${birthdates} on ${month} ${day} <sup> ${getSymboleDate(
          day
        )} </sup></li>
          <li>${ageResult}</li>
          <li class="">${day}<br>Days</li>
          <li class="edit">
            <button type="button" name="edit" class="edit"><svg class="edit" width="20px" height="20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </li>
          <li class="delete">
            <button type="button" class="delete"><svg class="delete" width="20px" height="20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
          </li>
        </ul>
      `;
      })
      .join("");
  }

  export { displayPeopleBirthdayList };