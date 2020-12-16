import { destroyModalEditDeleteOrCancel } from "./destroy.js";
import { displayList } from "./display.js";
import { result, main, peps } from "./script.js";

// function of deleting people
function deletePersonBirthday(idItem) {
  console.log("Delete button is clicked");

  return new Promise(function (resolve) {
    const personToDelete = result.find((person) => person.id == idItem);
    const popup = document.createElement("form");
    popup.classList.add("person");
    const delHtml = `
      <article>
        <h2>Do you want to delete ${personToDelete.firstName} ${personToDelete.lastName}</h2>
        <div class="delBtn">
          <div class="yes">
          <button type="button" class="yesDel" name="yes">YES</button>
          </div>
          <div>
          <button type="button" name="cancel" class="cancel">Cancel</button>
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
          const people = result.filter((person) => person.id != idItem);
          displayList(people);
          destroyModalEditDeleteOrCancel(popup);

          main.dispatchEvent(new CustomEvent("itemUpdated"));
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

export { deletePersonBirthday };
