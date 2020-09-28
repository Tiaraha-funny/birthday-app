import { result } from './script.js';

const showBirth = (event, filterBirthday, filterMonth) => {
	let sortedBirth =  result.sort(
        (sooner, later) => later.birthday - sooner.birthday
      )

	// DO THE FILTERING HERE
	if (filterBirthday) {
		sortedBirth = sortedBirth.filter(birth => {
			let lowerCaseName = birth.firstName.toLowerCase() || birth.lastName.toLowerCase();
			let lowerCaseFilter = filterBirthday.toLowerCase();
			if (lowerCaseName.includes(lowerCaseFilter)) {
				return true;
			} else {
				return false;
			}
		});
	}

	if (filterMonth) {
		sortedBirth = sortedBirth.filter(birth => birth.style === filterMonth);
	}
}

export { showBirth };