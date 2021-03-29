
import { editPersonBirthday } from "./edit.js";
import { deletePersonBirthday } from "./delete.js";

//Handling all some of the click buttons

  const handleClick = (e) => {
    if (e.target.closest("button.edit")) {
      const parent = e.target.closest("ul");
      const id = parent.dataset.id;
      editPersonBirthday(id);
    }
    
    if (e.target.closest("button.delete")) {
      const parent = e.target.closest("ul");
      const id = parent.dataset.id;
      deletePersonBirthday(id);
    }
  };
  
  export { handleClick };