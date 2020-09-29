
import { result, main } from './script.js';
import { displayPeopleBirthdayList } from "./display.js";
import { destroyModalEditDeleteOrCancel } from "./destroy.js";

//function of edit people

function editPersonBirthday(id) {
  console.log("Edit is clicked");

  const personToEdit = result.find((person) => person.id === id);

  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("person");
    const editHtml = `
    <div class="form">
      <h2>Do you want to edit something?</h2>
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

export { editPersonBirthday };