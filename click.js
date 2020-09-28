
import { editPersonBirthday } from "./edit.js";
import { deletePersonBirthday } from "./delete.js";

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
  
  export { handleClick };