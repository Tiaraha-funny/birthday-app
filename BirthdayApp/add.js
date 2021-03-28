import { result, main } from "./script.js";
import { displayPeopleBirthdayList } from "./display.js";
import { destroyModalEditDeleteOrCancel } from "./destroy.js";

function addListOfPeople(id) {
  return new Promise(function (resolve) {
    localStorage.clear();
    console.log("I want to add this list");

    const popup = document.createElement("form");
    popup.classList.add("person");
    result.find((person) => person.id !== id);

    const closeFromX = document.createElement("button");
    closeFromX.classList.add("closeButton");
    closeFromX.textContent = "X"
    
    const addHtml = `
    <div class="wrapper">
      <div class="form">
        <h2>Do you want to add this lists?</h2>
        <label>Enter the last Name</label>
        <input type="text" name="lastName" id="lastName"><br>
        <label>Enter the first name</label>
        <input type="text" name="firstName" id="firstName"><br>
        <label>Enter the birthday</label>
        <input type="date" max=${new Date().toISOString().slice(0, 10)} name="birthday" id="birthday"><br>
        <div class="buttons">
          <button type="submit addBtn" class="sub">Submit</button>
          <button type="button" name="cancel" class="cancel">Cancel</button>
        </div>
      </div>
    </div>
  `;
    // main.insertAdjacentHTML("beforeend", addHtml)
    popup.innerHTML = addHtml;
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
        id: Date.now(),
      };
      
      result.unshift(newBirthday);
      displayPeopleBirthdayList();
      destroyModalEditDeleteOrCancel(popup);
      main.dispatchEvent(new CustomEvent("itemUpdated"));
      formEl.reset();
    });

    if (popup.cancel) {
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
