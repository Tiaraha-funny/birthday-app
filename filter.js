// import { result, peps } from "./script.js";

// // async function showBirth(event, filterName, filterMonth) {
// //   let response = await fetch(peps);
// //   let data = await response.json();
// //   let result = data;
// //   let sortedBirth = result.sort(
// //     (sooner, later) => later.birthday - sooner.birthday
// //   );

//   // DO THE FILTERING HERE
//   if (filterName) {
//     sortedBirth = sortedBirth.filter((birth) => {
//       let lowerCaseName =
//         birth.firstName.toLowerCase();
//       let lowerCaseFilter = filterName.toLowerCase();
//       if (lowerCaseName.includes(lowerCaseFilter)) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   }

//   if (filterMonth) {
//     sortedBirth = sortedBirth.filter((birth) => birth.month === filterMonth);
//   }
// }

// export { showBirth };
