import { result, main } from "./script.js";

// Maping all the people in the list from the fetch function

function displayPeopleBirthdayList(event, filterName, filterMonth) {
  let sortedBirthday = result.sort(
    (sooner, later) => later.birthday - sooner.birthday
  );
  

  // DO THE FILTERING HERE
  if (filterName) {
    sortedBirthday = sortedBirthday.filter((birth) => {
      let lowerCaseName = birth.firstName.toLowerCase();
      let lowerCaseFilter = filterName.toLowerCase();

      if (lowerCaseName.includes(lowerCaseFilter)) {
        return true;
      } else {
        return false;
      }
    });
  } 
  
  else if (filterMonth) {
    sortedBirthday = sortedBirthday.filter((birth) => {
      let newMonth = new Date(birth.birthday);
      let moths = newMonth.toLocaleString("en-us", { month: "long" });
      console.log(moths);
      let lowerCaseMonth = moths.toLowerCase();
      let lowerCaseFilter = filterMonth.toLowerCase();

      if (lowerCaseMonth == lowerCaseFilter) {
        return true;
      } else {
        return false;
      }
    });
  }

  main.innerHTML = sortedBirthday
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
      var mymonth = birthDate.getMonth();
      var myYear = birthDate.getFullYear();
      var ageResult = `${myYear}/${mymonth}/${day}`;
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
      const oneDay = 24 * 60 * 60 * 1000;
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
      
      let age = new Date().getFullYear() - new Date(person.birthday).getFullYear();
      
      if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {

       daysBirth.setFullYear(daysBirth.getFullYear() + 1);
        age =
          new Date().getFullYear() +
          1 -
          new Date(person.birthday).getFullYear();
      }

      let notDayNow = Math.round(
        Math.abs((new Date(daysBirth) - new Date(today)) / oneDay)
      );

      return `
        <ul data-id="${
          person.id
        }" class="d-flex flex-row justify-content-around list-unstyled">
          <li class=""><img class="rounded-circle" src="${
            person.picture
          }" alt="images"></li>
          <li class="names"><b>${person.lastName} ${
        person.firstName
      }</b><br>Turns ${age} on ${dateOfBirth} <sup> ${getSymboleDate(
        daysBirth
      )} ${month}  </sup></li>
          <li>${ageResult}</li>
          <li class=""><svg class="w-6 h-6" fill="#ffd803" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>
          ${notDayNow}<br>Days</li>
          <li class="edit">
            <button type="button" name="edit" class="edit"><svg class="edit" width="40px" height="40px" fill="#2cb67d" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </li>
          <li class="delete">
            <button type="button" class="delete"><svg class="delete" width="40px" height="40px" fill="#f25042" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
          </li>
        </ul>
      `;
    })
    .join("");
}

export { displayPeopleBirthdayList };
