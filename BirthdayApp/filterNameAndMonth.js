import { displayList } from "./display.js";
import { result, filterNameInput, filterMonthInput } from "./script.js";

const filterBirthdayByNames = (people) => {
    console.log("I am here");
    const checkInputName = filterNameInput.value.toLowerCase();
    console.log(checkInputName);
    const filterInputName = people.filter(
      (name) =>
        name.firstName.toLowerCase().includes(checkInputName) ||
        name.lastName.toLowerCase().includes(checkInputName)
    );
    return filterInputName;
  };

const filterBirthdayByMonths = (people) => {
    const checkSelectMonth = filterMonthInput.value;
    const filterSelectMonth = people.filter((month) => {
        if(checkSelectMonth === "all") {
            return true
        }
      const fullMonth = new Date(month.birthday).toLocaleString("en-US", {
        month: "long",
      });
      return fullMonth.toLowerCase().includes(checkSelectMonth);
    });
    return filterSelectMonth;
  };

export const filterByNamesAndMonths = () => {
      displayList(filterBirthdayByMonths(filterBirthdayByNames(result)));      
  }