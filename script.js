
 const main = document.querySelector("main");

 async function fetchPeople() {
  let response = await fetch("http://127.0.0.1:5500/people.json");
  console.log(response);
  const data = response.json();
  return data;
}

async function givePeopleBirthdayList() {
  const birthday = await fetchPeople();
  const html = birthday.sort((sooner, later) => later.rt_score - sooner.rt_score)
        .map(birth => {
          return `
            <ul class="d-flex flex-row justify-content-around list-unstyled">
              <li class=""><img class="rounded-circle" src="${birth.picture}" alt="images"></li>
              <li class="names">${birth.lastName} ${birth.firstName}</li>
              <li class="">${birth.birthday}</li>
              <li class="edit">
                <button type="button" class="rounded border-0 bg-white "><svg class="w-6 h-6" width="20px" height="20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </li>
              <li class="delete">
                <button type="button" class="rounded border-0 bg-white "><svg class="w-6 h-6"  width="20px" height="20px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
              </li>
            </ul>
          `
      }).join('');
  main.innerHTML = html;
}


givePeopleBirthdayList();