import { result } from "./BirthdayApp/script.js";

export const searchNameFilter = document.querySelector('.searchName');
export const filterMonthFilter = document.querySelector('.filterMonth');

export const filterNameInput = result => {
	if (searchNameFilter.value !== '') {
		result = result.filter(person => {
			const fullNameLowercase =
				person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase();
			return fullNameLowercase.includes(searchNameFilter.value.toLowerCase());
		});
	}
	return result;
};

export const filterMonthInput = result => {
	if (filterMonthFilter.value !== '') {
		result = result.filter(person => {
			let birthday = new Date(person.birthday);
			return birthday.getMonth() === Number(filterMonthFilter.value);
		});
	}
	return result;
};