//Fetch all the people in the list
const peps = "http://127.0.0.1:5500/people.json";

//Drag the elements from the html
const main = document.querySelector("main");
const addBtn = document.querySelector(".add");

async function fetchPeople() {
  let response = await fetch(peps);
  const data = await response.json();
  let result = [];
  result = data;
  // restoreFromLocalStorage(result);
  displayPeopleBirthdayList(result);
  main.dispatchEvent(new CustomEvent("itemUpdated"));

  //Local storage function

  function setItemOfBirthdayToLocalStorage() {
    localStorage.setItem("result", JSON.stringify(result));
  }

  async function restoreFromLocalStorage() {
    console.log("restoring from the local storage");
    const lsItems = JSON.parse(localStorage.getItem("result"));

    //check if the there's something inside the local storage
    if (lsItems) {
      result = lsItems;
    } else {
      const response = await fetch(`${peps}`);
      const data = await response.json();
      result = [...data];
      displayPeopleBirthdayList(result);
    }
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }

  // Maping all the people in the list from the fetch function

  function displayPeopleBirthdayList() {
    const sortedBirthday = result.sort(
      (sooner, later) => later.birthday - sooner.birthday
    );
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

  //Handling all some of the click buttons

  const handleClick = (e) => {
    localStorage.clear();

    if (e.target.closest("button.edit")) {
      console.log("You are able to edit anything");
      const parent = e.target.closest("ul");
      const id = parent.dataset.id;
      editPersonBirthday(id);
    }
    if (e.target.closest("button.delete")) {
      console.log("You are able to delete");
      const parent = e.target.closest("ul");
      const id = parent.dataset.id;
      deletePersonBirthday(id);
    }
  };

  //function of edit people

  function editPersonBirthday(id) {
    console.log("Edit is clicked");

    const personToEdit = result.find((person) => person.id !== id);

    return new Promise(function (resolve) {
      const popup = document.createElement("form");
      popup.classList.add("person");
      const editHtml = `
      <div class="form">
        <h1>Do you want to edit something?</h1>
        <label>URL of the picture:</labe><br>
        <input type="url" name="picture" id="picture" value="${personToEdit.picture}"><br>
        <label>Last Name:</labe><br>
        <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}"><br>
        <label>First name:</labe><br>
        <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}"><br>
        <label>Birthday:</labe><br>
        <input type="text" name="birthday" id="birthday" value="${personToEdit.birthday}"><br>
        <div class="buttons">
          <button type="submit">Save</button>
          <button type="button" name="cancel">Cancel</button>
        </div>
      </div>
    `;
      popup.insertAdjacentHTML("afterbegin", editHtml);

      popup.addEventListener(
        "submit",
        (e) => {
          e.preventDefault();
          resolve();

          personToEdit.picture = popup.picture.value;
          personToEdit.lastName = popup.lastName.value;
          personToEdit.firstName = popup.firstName.value;
          personToEdit.birthday = popup.birthday.value;

          resolve(e.currentTarget.remove());
          displayPeopleBirthdayList(result);
          destroyModalEditDeleteOrCancel(popup);
        },
        { once: true }
      );

      if (popup.cancel) {
        console.log("Cancel button is clicked");
        popup.cancel.addEventListener(
          "click",
          function () {
            resolve(null);
            destroyModalEditDeleteOrCancel(popup);
          },
          { once: true }
        );

        window.addEventListener("keyup", (e) => {
          if (e.key === "Escape") {
            popup.classList.remove("open");
          }
        });

        resolve(document.body.appendChild(popup));
        popup.classList.add("open");
      }
      main.dispatchEvent(new CustomEvent("itemUpdated"));
    });
  }

  // function of deleting people
  function deletePersonBirthday(id) {
    console.log("Delete button is clicked");

    return new Promise(function (resolve) {
      const popup = document.createElement("form");
      popup.classList.add("person");
      const delHtml = `
      <article>
        <h2>Do you want to delete this person?</h2>
        <div class="delBtn">
          <div class="yes">
          <button type="button" class="yesDel" name="yes">YES</button>
          </div>
          <div>
          <button type="button" name="cancel">Cancel</button>
          </div>
        </div>
      </article>
      `;
      popup.innerHTML = delHtml;

      popup.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          if (e.target.matches("button.yesDel")) {
            console.log("I am ready to delete this one");
            result = result.filter((person) => person.id !== id);
            displayPeopleBirthdayList();
            destroyModalEditDeleteOrCancel(popup);
          }
        },
        { once: true }
      );

      if (popup.cancel) {
        console.log("No I don't want to delete");
        popup.cancel.addEventListener(
          "click",
          function () {
            resolve(null);
            destroyModalEditDeleteOrCancel(popup);
          },
          { once: true }
        );

        window.addEventListener("keyup", (e) => {
          if (e.key === "Escape") {
            popup.classList.remove("open");
          }
        });

        resolve(document.body.appendChild(popup));
        popup.classList.add("open");
      }
      main.dispatchEvent(new CustomEvent("itemUpdated"));
    });
  }

  function addListOfPeople(id) {
    return new Promise(function (resolve) {
      localStorage.clear();
      console.log("I want to add this list");

      const popup = document.createElement("form");
      popup.classList.add("person");
      const addHtml = `
      <div class="form">
        <h1>Do you want to add this lists?</h1>
        <label>Enter the picture URL</labe><br>
        <input type="url" name="picture" id="picture"><br>
        <label>Enter the last Name</labe><br>
        <input type="text" name="lastName" id="lastName"><br>
        <label>Enter the first name</labe><br>
        <input type="text" name="firstName" id="firstName"><br>
        <label>Enter the birthday</labe><br>
        <input type="date" name="birthday" id="birthday"><br>
      <div class="buttons">
        <button type="submit addBtn">Submit</button>
        <button type="button" name="cancel">Cancel</button>
      </div>
      <small>You are going to see your new list at the end!!</small>
    </div>
  `;
      popup.innerHTML = addHtml;
      resolve();

      popup.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("This is the submit");

        console.log(result);
        const formEl = e.currentTarget;

        const newBirthday = {
          picture: formEl.picture.value,
          lastName: formEl.lastName.value,
          firstName: formEl.firstName.value,
          birthday: formEl.birthday.value,
          id: Date.now(),
        };
        result.push(newBirthday);
        displayPeopleBirthdayList();
        destroyModalEditDeleteOrCancel(popup);
        main.dispatchEvent(new CustomEvent("itemUpdated"));
        formEl.reset();
      });

      if (popup.cancel) {
        console.log("No I don't want to delete");
        popup.cancel.addEventListener(
          "click",
          function () {
            resolve(null);
            destroyModalEditDeleteOrCancel(popup);
          },
          { once: true }
        );
        resolve(document.body.appendChild(popup));
        popup.classList.add("open");
        main.dispatchEvent(new CustomEvent("itemUpdated"));
      }
      window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          popup.classList.remove("open");
        }
      });
    });
  }

  //Destroy the function after clicking the buttons

  function destroyModalEditDeleteOrCancel(popup) {
    popup.classList.remove("open");
    popup.remove();
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }

  window.addEventListener("click", handleClick);
  addBtn.addEventListener("click", addListOfPeople);
  main.addEventListener("itemUpdated", setItemOfBirthdayToLocalStorage);
  displayPeopleBirthdayList();
  restoreFromLocalStorage();
}

fetchPeople();
