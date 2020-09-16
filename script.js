
//Fetch all the people in the list

async function fetchPeople() {
  let response = await fetch("http://127.0.0.1:5500/people.json");
  const data = await response.json();
  let result = data;


//Drag the elements from the html
const main = document.querySelector("main");
const addBtn = document.querySelector('.add');

//Local storage function

function setItemOfBirthdayToLocalStorage () {
  localStorage.setItem('birthday', JSON.stringify(result));
} 

function restoreFromLocalStorage () {
  console.log('restoring from the local storage');
  const lsItems = JSON.parse(localStorage.getItem(result));

  //check if the there's something inside the local storage
  if(lsItems) {
    lsItems.forEach(item => fetchPeople.push(item));
  }
}

//Handling the adding lists
const addListOfPeople = e => {
  console.log('I want to add this list');

}

// Maping all the people in the list from the fetch function

function displayPeopleBirthdayList() {

  const html = result
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

  const personToEdit = result.find((person) => person.id === id);

  return new Promise(function (resolve) {
    const newForm = document.createElement("form");
    newForm.classList.add("person");
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
    newForm.insertAdjacentHTML("afterbegin", editHtml);

    newForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        resolve();

        personToEdit.picture = newForm.picture.value;
        personToEdit.lastName = newForm.lastName.value;
        personToEdit.firstName = newForm.firstName.value;
        personToEdit.birthday = newForm.birthday.value;

        resolve(e.currentTarget.remove());
        displayPeopleBirthdayList(result);
        destroyModalEditDeleteOrCancel(newForm);
      },
      { once: true }
    );

    if (newForm.cancel) {
      console.log("Cancel button is clicked");
      newForm.cancel.addEventListener(
        "click",
        function () {
          resolve(null);
          destroyModalEditDeleteOrCancel(newForm);
        },
        { once: true }
      );

      resolve(document.body.appendChild(newForm));
      newForm.classList.add("open");
    }
    // main.dispatchEvent(new CustomEvent('itemUpdated'));
  });

}

// function of deleting people
function deletePersonBirthday(id) {
  console.log("Delete button is clicked");
  const personToDelete = result.find(
    (person) => person.id === id
  );

  return new Promise(function (resolve) {
    const deleteForm = document.createElement("form");
    deleteForm.classList.add("delPerson");
    const delHtml = `
      <article>
        <h2>Do you want to delete this person?</h2>
        <div class="delBtn">
          <button type="button" name="yes">YES</button>
          <button type="button" name="cancel">Cancel</button>
        </div>
      </article>
      `;
    deleteForm.innerHTML = delHtml;

    // if(deleteForm.yes) {
    //   console.log("I am ready to delete this one");
    //   deleteForm.yes.addEventListener("click", 
    //   function () {
    //     resolve();
    //     deleteForm.classList.remove(personToDelete)
    // }, { once: true })
    // }

    if (deleteForm.cancel) {
      console.log("No I don't want to delete");
      deleteForm.cancel.addEventListener(
        "click",
        function () {
          resolve(null);
          destroyModalEditDeleteOrCancel(deleteForm);
        },
        { once: true }
      );

      resolve(document.body.appendChild(deleteForm));
      deleteForm.classList.add("open");
    }
    main.dispatchEvent(new CustomEvent('itemUpdated'));
  });
}

//Destroy the function after clicking the buttons

function destroyModalEditDeleteOrCancel(newForm) {
  newForm.classList.remove("open");
  newForm.remove();
  main.dispatchEvent(new CustomEvent('itemUpdated'));
}

window.addEventListener("click", handleClick);
addBtn.addEventListener('click', addListOfPeople);
displayPeopleBirthdayList();
main.addEventListener('itemUpdated', setItemOfBirthdayToLocalStorage);

restoreFromLocalStorage();
}

fetchPeople();