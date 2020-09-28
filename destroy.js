
import { main } from './script.js';

  //Destroy the function after clicking the buttons

  function destroyModalEditDeleteOrCancel(popup) {
    popup.classList.remove("open");
    popup.remove();
    main.dispatchEvent(new CustomEvent("itemUpdated"));
  }
  
  export { destroyModalEditDeleteOrCancel };