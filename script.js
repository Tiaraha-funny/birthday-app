// const { async } = require("regenerator-runtime");

const main = document.querySelector("main");

async function fetchPeople() {
  let response = await fetch("http://127.0.0.1:5500/people.json");
  console.log(response);
  const data = response.json();
  return data;
}

let birthPerson = [];

async function givePeopleBirthdayList() {
  const birthday = await fetchPeople();
  const html = birthday
    .sort((sooner, later) => later.id - sooner.id)
    .map((birth) => {
      return `
        <ul data-id="${birth.id}" class="d-flex flex-row justify-content-around list-unstyled">
          <li class=""><img class="rounded-circle" src="${birth.picture}" alt="images"></li>
          <li class="names">${birth.lastName} ${birth.firstName}</li>
          <li class="">${birth.birthday}</li>
          <li class="edit">
            <button type="button" name="edit" class="edit"><svg class="edit" width="20px" height="20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </li>
          <li class="delete">
            <button type="button" class="delete"><svg class="delete"  width="20px" height="20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
          </li>
        </ul>
      `;
    })
    .join("");
  main.innerHTML = html;
}

const handleClick = (e) => {
  console.log("The edit is clicked");
  if (e.target.closest("button.edit")) {
    console.log("You can edit here");
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

async function editPersonBirthday(id) {
  console.log("Edit is clicked");

  const editBirthday = await fetchPeople();

  const personToEdit = editBirthday.find((person) => person.id === id);
  console.log(personToEdit);

  return new Promise(function (resolve) {
    const newForm = document.createElement("form");
    newForm.classList.add("person");
    const editHtml= `
    <div class="form">
          <h1>Do you want to edit something?</h1>
            <label>Last Name</labe><br>
            <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}"><br>
            <label>First name</labe><br>
            <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}"><br>
            <label>Birthday</labe><br>
            <input type="text" name="birthday" id="birthday" value="${personToEdit.birthday}"><br>
          <div class="buttons">
            <button type="submit">
              Save
            </button>
            <button type="button" name="cancel">
              Cancel
            </button>
          </div>
        </div>
    `
    newForm.insertAdjacentHTML("afterbegin", editHtml);

    newForm.addEventListener("submit", (e) => {
      e.preventDefault();
      resolve();
    });

    resolve(document.body.appendChild(newForm));
    newForm.classList.add("open");
  });
};

window.addEventListener("click", handleClick);
givePeopleBirthdayList();
