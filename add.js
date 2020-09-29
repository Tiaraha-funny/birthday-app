import { result, main } from './script.js';
import { displayPeopleBirthdayList } from "./display.js";
import { destroyModalEditDeleteOrCancel } from "./destroy.js";

  function addListOfPeople(id) {

    return new Promise(function (resolve) {
      localStorage.clear();
      console.log("I want to add this list");

      const popup = document.createElement("form");
      popup.classList.add("person");
      result.find((person) => person.id !== id)
      const addHtml = `
      <div class="form">
        <h2>Do you want to add this lists?</h2>
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
  
  export { addListOfPeople };