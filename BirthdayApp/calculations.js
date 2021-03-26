var birthDate = new Date(person.birthday);
var day = birthDate.getDay();

export function getSymboleDate(date) {
    if (date < 3 && date > 31) return "th";
    switch (day % 2) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
