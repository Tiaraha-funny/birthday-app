import { result, main } from "./script.js";
import { displayList } from "./display.js";
import { destroyModalEditDeleteOrCancel } from "./destroy.js";

//function of edit people

function editPersonBirthday(id) {
  console.log("Edit is clicked");

  const personToEdit = result.find((person) => person.id == id);
  console.log(result.find((person) => person.id == id));

  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("person");

    const editHtml = `
    <div class="wrapper">
      <div class="form">
        <h2>Edit ${personToEdit.lastName} ${personToEdit.firstName}</h2>
        <label>Last Name:</label>
        <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}"><br>
        <label>First name:</label>
        <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}"><br>
        <label>Birthday:</label>
        <input type="text" name="birthday" id="birthday" value="${new Date(personToEdit.birthday).toLocaleDateString()}"><br>
        <div class="buttons">
          <button type="submit" class="add">Save changes</button>
          <button id="close-button-cancel" type="button" name="cancel" class="cancel">Cancel</button>
        </div>
      </div>
      <button id="close-button-x" class="closeButton"><small>X</small></button>
    </div>
  `;
    popup.insertAdjacentHTML("afterbegin", editHtml);

    const closeButtonX = popup.querySelector("#close-button-x");
    const closeButtonCancel = popup.querySelector("#close-button-cancel");

    closeButtonCancel.addEventListener("click", (e) => {
      destroyModalEditDeleteOrCancel(popup);
    })

    closeButtonX.addEventListener("click", (e) => {
      destroyModalEditDeleteOrCancel(popup);
    })


    popup.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        resolve();

        // personToEdit.picture = popup.picture.value;
        personToEdit.lastName = popup.lastName.value;
        personToEdit.firstName = popup.firstName.value;
        personToEdit.birthday = popup.birthday.value;

        resolve(e.currentTarget.remove());
        displayList(result);
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
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  });
}

export { editPersonBirthday };
