import { result, main, body } from "./script.js";
import { displayPeopleBirthdayList } from "./display.js";
import { destroyModalEditDeleteOrCancel } from "./destroy.js";

function addListOfPeople(id) {
  return new Promise(function (resolve) {
    localStorage.clear();
    console.log("I want to add this list");

    const popup = document.createElement("form");

    popup.classList.add("person");
    result.find((person) => person.id !== id);
    const addHtml = `
    <div class="wrapper">
      <div class="form">
        <h2>Do you want to add this lists?</h2>
        <label>Enter the last Name</label><br>
        <input type="text" name="lastName" id="lastName" required><br>
        <label>Enter the first name</label><br>
        <input type="text" name="firstName" id="firstName" required><br>
        <label>Enter the birthday</label><br>
        <input type="date" max=${new Date().toISOString().slice(0, 10)} name="birthday" id="birthday" required><br>
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
      body.style.overflow="unset"
      destroyModalEditDeleteOrCancel(popup);
    })

    closeButtonX.addEventListener("click", (e) => {
      console.log("click on cancel");
      body.style.overflow="unset"
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
        id: Date.now().toString(),
      };

      result.unshift(newBirthday);
      displayPeopleBirthdayList();
      body.style.overflow="unset"
      destroyModalEditDeleteOrCancel(popup);
      main.dispatchEvent(new CustomEvent("itemUpdated"));
      formEl.reset();
    });
    
      resolve(document.body.appendChild(popup));
      popup.classList.add("open");
      body.style.overflow="hidden"
      main.dispatchEvent(new CustomEvent("itemUpdated"));

      window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        popup.classList.remove("open");
      }
    });
  });
}

export { addListOfPeople };