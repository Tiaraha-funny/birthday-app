import { result, main } from "./script.js";
import { editSvg, deleteSvg, cakeSvg } from "./icons-SVGs/svg.js";

// Maping all the people in the list from the fetch function

function calculateDaysToBirthday(array) {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  array.forEach((person) => {
    let daysBirth = new Date(person.birthday).toISOString().slice(4);
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

function displayList(array) {
  calculateDaysToBirthday(array);
  const sortedArray = array.sort(
    (personA, personB) => personA.daysToBirthday - personB.daysToBirthday
  );
  const html = htmlGenerator(sortedArray);
  main.innerHTML = html;
}

function displayPeopleBirthdayList() {
  displayList(result);
}

export { displayPeopleBirthdayList, displayList };
