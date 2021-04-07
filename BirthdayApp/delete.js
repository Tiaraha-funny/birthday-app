import { destroyModalEditDeleteOrCancel } from "./destroy.js";
import { displayList } from "./display.js";
import { result, main, peps, updateResult, body } from "./script.js";

// function of deleting people
function deletePersonBirthday(idItem) {

  return new Promise(function (resolve) {
    console.log(result);
    const personToDelete = result.find((person) => person.id == idItem);
    console.log("person to delete", personToDelete);
    
    const popup = document.createElement("form");
    popup.classList.add("person");
    body.style.overflow="hidden";

    const delHtml = `
    <div class="deletion">
      <article class="deletion-wrapper">
        <h2>Do you want to delete <span class="red-name">${personToDelete.firstName} ${personToDelete.lastName}</span>?</h2>
        <div class="delBtn">
          <div class="yes">
          <button type="button" id="yes-delete" class="yes-delete" name="yes">YES</button>
          </div>
          <div>
          <button type="button" name="cancel" class="cancel">Cancel</button>
          </div>
        </div>
      </article>
    </div>
      `;
    popup.innerHTML = delHtml;

    popup.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        if (e.target.matches("button.yes-delete")) {
          console.log("id items", idItem);
          
          const filteredPeople = result.filter((person) => person.id !== idItem);
          console.log("I am ready to delete this one", filteredPeople);
          body.style.overflow="unset";
          destroyModalEditDeleteOrCancel(popup);
          updateResult(filteredPeople);
          displayList(filteredPeople);
          main.dispatchEvent(new CustomEvent("itemUpdated"));
        }
      },
      { once: true }
    );

    if (popup.cancel) {
      popup.cancel.addEventListener(
        "click",
        function () {
          resolve(null);
          body.style.overflow="unset";
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

export { deletePersonBirthday };
