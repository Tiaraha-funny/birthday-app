// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"BirthdayApp/icons-SVGs/svg.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cakeSvg = exports.deleteSvg = exports.editSvg = void 0;
const editSvg = `<svg class="edit" width="20px" height="20px" fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`;
exports.editSvg = editSvg;
const deleteSvg = `<svg class="delete" width="20px" height="20px" fill="none" stroke="#EF4565" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
exports.deleteSvg = deleteSvg;
const cakeSvg = `<svg class="w-6 h-6" fill="#ffd803" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>`;
exports.cakeSvg = cakeSvg;
},{}],"BirthdayApp/display.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPeopleBirthdayList = displayPeopleBirthdayList;
exports.displayList = displayList;

var _script = require("./script.js");

var _svg = require("./icons-SVGs/svg.js");

// Maping all the people in the list from the fetch function
function calculateDaysToBirthday(array) {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  array.forEach(person => {
    let daysBirth = new Date(person.birthday).toISOString().slice(4); // console.log("person.birthday", new Date(person.birthday));

    daysBirth = today.getFullYear() + daysBirth;
    const daysToBirthday = Math.round((new Date(daysBirth) - new Date(today)) / oneDay);
    person.daysToBirthday = daysToBirthday < 0 ? daysToBirthday + 365 : daysToBirthday;
  });
}

const htmlGenerator = array => {
  return array.map(person => {
    function getSymboleDate(date) {
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

    var birthDate = new Date(person.birthday);
    var day = birthDate.getDay();
    let month; // to get the date and the months

    let dateOfBirth = new Date(person.birthday).getDate();
    let monthOfBirth = new Date(person.birthday).getMonth();

    switch (monthOfBirth) {
      case 0:
        month = "January";
        break;

      case 1:
        month = "February";
        break;

      case 2:
        month = "March";
        break;

      case 3:
        month = "April";
        break;

      case 4:
        month = "May";
        break;

      case 5:
        month = "June";
        break;

      case 6:
        month = "July";

      case 7:
        month = "August";
        break;

      case 8:
        month = "September";
        break;

      case 9:
        month = "October";
        break;

      case 10:
        month = "November";
        break;

      case 11:
        month = "December";
    } // calculate days


    let today = new Date();
    let year; // if the current month is bigger than the month of birth, then add one more month

    if (today.getMonth() > monthOfBirth) {
      year = today.getFullYear() + 1;
    } else if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
      year = today.getFullYear();
    } else {
      // the same as the before
      year = today.getFullYear();
    } // calculate the day of birth


    let daysBirth = new Date(year, monthOfBirth, dateOfBirth);
    let age = new Date().getFullYear() - new Date(person.birthday).getFullYear();

    if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
      daysBirth.setFullYear(daysBirth.getFullYear() + 1);
      age = new Date().getFullYear() + 1 - new Date(person.birthday).getFullYear();
    }

    return `
      <ul data-id="${person.id}" class="d-flex flex-row justify-content-around list-unstyled">
        <li class="">
          <img class="rounded-circle" src="${person.picture}" alt="images"/>
          <p class="names"><b>${person.lastName} ${person.firstName}</b><br>
            <span class="span">Turns 
              <span class="age"> ${age} </span> on ${month}  
              </sup>${dateOfBirth}<sup> ${getSymboleDate(daysBirth)}
            </span>
          </p>
        <li>
          <span class="span">In ${person.daysToBirthday} Days</span>
          <div class="buttons">
            <div class="edit">
              <button type="button" name="edit" class="edit">${_svg.editSvg}</button>
            </div>
            <div class="delete">
              <button type="button" class="delete">${_svg.deleteSvg}</button>
            </div>
          </div>
        </li>
      </ul>
    `;
  }).join("");
};

function displayList(array) {
  calculateDaysToBirthday(array);
  const sortedArray = array.sort((personA, personB) => personA.daysToBirthday - personB.daysToBirthday);
  const html = htmlGenerator(sortedArray);
  _script.main.innerHTML = html;
}

function displayPeopleBirthdayList() {
  displayList(_script.result);
}
},{"./script.js":"BirthdayApp/script.js","./icons-SVGs/svg.js":"BirthdayApp/icons-SVGs/svg.js"}],"BirthdayApp/localstorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setItemOfBirthdayToLocalStorage = setItemOfBirthdayToLocalStorage;
exports.restoreFromLocalStorage = restoreFromLocalStorage;

var _script = require("./script.js");

var _display = require("./display.js");

//Local storage function
function setItemOfBirthdayToLocalStorage() {
  localStorage.setItem("result", JSON.stringify(_script.result));
}

async function restoreFromLocalStorage() {
  let lsItems = JSON.parse(localStorage.getItem("result")); //check if the there's something inside the local storage

  if (lsItems) {
    (0, _script.updateResult)(lsItems);

    _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
  } else {
    let response = await fetch(`${_script.peps}`);
    let data = await response.json();
    (0, _script.updateResult)([...data]);
    (0, _display.displayPeopleBirthdayList)(_script.result);
  }

  _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
}
},{"./script.js":"BirthdayApp/script.js","./display.js":"BirthdayApp/display.js"}],"BirthdayApp/destroy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyModalEditDeleteOrCancel = destroyModalEditDeleteOrCancel;

var _script = require("./script.js");

//Destroy the function after clicking the buttons
function destroyModalEditDeleteOrCancel(popup) {
  popup.classList.remove("open");
  popup.remove();

  _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
}
},{"./script.js":"BirthdayApp/script.js"}],"BirthdayApp/add.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListOfPeople = addListOfPeople;

var _script = require("./script.js");

var _display = require("./display.js");

var _destroy = require("./destroy.js");

function addListOfPeople(id) {
  return new Promise(function (resolve) {
    localStorage.clear();
    console.log("I want to add this list");
    const popup = document.createElement("form");
    popup.classList.add("person");

    _script.result.find(person => person.id !== id);

    const addHtml = `
    <div class="wrapper">
      <div class="form">
        <h2>Do you want to add this lists?</h2>
        <label>Enter the last Name</label>
        <input type="text" name="lastName" id="lastName"><br>
        <label>Enter the first name</label>
        <input type="text" name="firstName" id="firstName"><br>
        <label>Enter the birthday</label>
        <input type="date" max=${new Date().toISOString().slice(0, 10)} name="birthday" id="birthday"><br>
        <div class="buttons">
          <button type="submit addBtn" class="sub">Submit</button>
          <button type="button" id="close-button-cancel" name="cancel" class="cancel">Cancel</button>
        </div>
      </div>
      <button id="close-button-x" class="closeButton"><small>X</samll></button>
    </div>
  `; // main.insertAdjacentHTML("beforeend", addHtml)

    popup.innerHTML = addHtml;
    const closeButtonX = popup.querySelector("#close-button-x");
    const closeButtonCancel = popup.querySelector("#close-button-cancel");
    closeButtonCancel.addEventListener("click", e => {
      console.log("click on cancel");
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
    });
    closeButtonX.addEventListener("click", e => {
      console.log("click on cancel");
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
    });
    resolve();
    popup.addEventListener("submit", e => {
      e.preventDefault();
      console.log("This is the submit");
      console.log(_script.result);
      const formEl = e.currentTarget;
      const newBirthday = {
        picture: "https://picsum.photos/id/1/200/300",
        lastName: formEl.lastName.value,
        firstName: formEl.firstName.value,
        birthday: formEl.birthday.value,
        id: Date.now()
      };

      _script.result.unshift(newBirthday);

      (0, _display.displayPeopleBirthdayList)();
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);

      _script.main.dispatchEvent(new CustomEvent("itemUpdated"));

      formEl.reset();
    });
    resolve(document.body.appendChild(popup));
    popup.classList.add("open");

    _script.main.dispatchEvent(new CustomEvent("itemUpdated"));

    window.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        popup.classList.remove("open");
      }
    });
  }); // if(popup.closeButton)
}
},{"./script.js":"BirthdayApp/script.js","./display.js":"BirthdayApp/display.js","./destroy.js":"BirthdayApp/destroy.js"}],"BirthdayApp/edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editPersonBirthday = editPersonBirthday;

var _script = require("./script.js");

var _display = require("./display.js");

var _destroy = require("./destroy.js");

//function of edit people
function editPersonBirthday(id) {
  console.log("Edit is clicked");

  const personToEdit = _script.result.find(person => person.id == id);

  console.log(_script.result.find(person => person.id == id));
  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("person");
    const editHtml = `
    <div class="wrapper">
      <div class="form">
        <h2>Edit ${personToEdit.lastName} ${personToEdit.firstName}</h2>
        <label>Last Name:</label>
        <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}"><br>
        <label>First name:</label>
        <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}"><br>
        <label>Birthday:</label>
        <input type="text" name="birthday" id="birthday" value="${new Date(personToEdit.birthday).toLocaleDateString()}"><br>
        <div class="buttons">
          <button type="submit" class="add">Save changes</button>
          <button id="close-button-cancel" type="button" name="cancel" class="cancel">Cancel</button>
        </div>
      </div>
      <button id="close-button-x" class="closeButton">X</button>
    </div>
  `;
    popup.insertAdjacentHTML("afterbegin", editHtml);
    const closeButtonX = popup.querySelector("#close-button-x");
    const closeButtonCancel = popup.querySelector("#close-button-cancel");
    closeButtonCancel.addEventListener("click", e => {
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
    });
    closeButtonX.addEventListener("click", e => {
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
    });
    popup.addEventListener("submit", e => {
      e.preventDefault();
      resolve(); // personToEdit.picture = popup.picture.value;

      personToEdit.lastName = popup.lastName.value;
      personToEdit.firstName = popup.firstName.value;
      personToEdit.birthday = popup.birthday.value;
      resolve(e.currentTarget.remove());
      (0, _display.displayList)(_script.result);
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
    }, {
      once: true
    });
    window.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        popup.classList.remove("open");
      }
    });
    resolve(document.body.appendChild(popup));
    popup.classList.add("open");

    _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
  });
}
},{"./script.js":"BirthdayApp/script.js","./display.js":"BirthdayApp/display.js","./destroy.js":"BirthdayApp/destroy.js"}],"BirthdayApp/delete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePersonBirthday = deletePersonBirthday;

var _destroy = require("./destroy.js");

var _display = require("./display.js");

var _script = require("./script.js");

// function of deleting people
function deletePersonBirthday(idItem) {
  return new Promise(function (resolve) {
    const personToDelete = _script.result.find(person => person.id == idItem);

    console.log("person to delete", personToDelete);
    const popup = document.createElement("form");
    popup.classList.add("person");
    const delHtml = `
    <div class="deletion">
      <article class="deletion-wrapper">
        <h2>Do you want to delete ${personToDelete.firstName} ${personToDelete.lastName}?</h2>
        <div class="delBtn">
          <div class="yes">
          <button type="button" id="yes-delete" class="yes-delete" name="yes">YES</button>
          </div>
          <div>
          <button type="button" name="cancel" class="cancel">Cancel</button>
          </div>
        </div>
      </article>
    </div>
      `;
    popup.innerHTML = delHtml; // const deleteList = popup.querySelector("#yes-delete");
    // deleteList.addEventListener("click", () => {
    // console.log("delete");
    // const people = result.filter((person) => person.id !== idItem);
    // displayList(people)
    // })

    popup.addEventListener("click", e => {
      e.preventDefault();

      if (e.target.matches("button.yes-delete")) {
        console.log("id items", idItem);

        const filteredPeople = _script.result.filter(person => person.id !== idItem);

        console.log("I am ready to delete this one", filteredPeople);
        (0, _script.updateResult)(filteredPeople);
        (0, _display.displayList)(filteredPeople);
        (0, _destroy.destroyModalEditDeleteOrCancel)(popup);

        _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
      }
    }, {
      once: true
    });

    if (popup.cancel) {
      popup.cancel.addEventListener("click", function () {
        resolve(null);
        (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
      }, {
        once: true
      });
      window.addEventListener("keyup", e => {
        if (e.key === "Escape") {
          popup.classList.remove("open");
        }
      });
      resolve(document.body.appendChild(popup));
      popup.classList.add("open");
    }

    _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
  });
}
},{"./destroy.js":"BirthdayApp/destroy.js","./display.js":"BirthdayApp/display.js","./script.js":"BirthdayApp/script.js"}],"BirthdayApp/click.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClick = void 0;

var _edit = require("./edit.js");

var _delete = require("./delete.js");

//Handling all some of the click buttons
const handleClick = e => {
  if (e.target.closest("button.edit")) {
    const parent = e.target.closest("ul");
    const id = parent.dataset.id;
    (0, _edit.editPersonBirthday)(id);
  }

  if (e.target.closest("button.delete")) {
    const parent = e.target.closest("ul");
    const id = parent.dataset.id;
    (0, _delete.deletePersonBirthday)(id);
  }
};

exports.handleClick = handleClick;
},{"./edit.js":"BirthdayApp/edit.js","./delete.js":"BirthdayApp/delete.js"}],"BirthdayApp/filterNameAndMonth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByNamesAndMonths = void 0;

var _display = require("./display.js");

var _script = require("./script.js");

const filterBirthdayByNames = people => {
  const checkInputName = _script.filterNameInput.value.toLowerCase();

  console.log(checkInputName);
  const filterInputName = people.filter(name => name.firstName.toLowerCase().includes(checkInputName) || name.lastName.toLowerCase().includes(checkInputName));
  return filterInputName;
};

const filterBirthdayByMonths = people => {
  const checkSelectMonth = _script.filterMonthInput.value;
  const filterSelectMonth = people.filter(month => {
    if (checkSelectMonth === "all") {
      return true;
    }

    const fullMonth = new Date(month.birthday).toLocaleString("en-US", {
      month: "long"
    });
    return fullMonth.toLowerCase().includes(checkSelectMonth);
  });
  return filterSelectMonth;
};

const filterByNamesAndMonths = () => {
  (0, _display.displayList)(filterBirthdayByMonths(filterBirthdayByNames(_script.result)));
};

exports.filterByNamesAndMonths = filterByNamesAndMonths;
},{"./display.js":"BirthdayApp/display.js","./script.js":"BirthdayApp/script.js"}],"BirthdayApp/script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateResult = updateResult;
exports.fetchPeople = fetchPeople;
exports.filterNameInput = exports.filterMonthInput = exports.addBtn = exports.main = exports.result = exports.peps = void 0;

var _localstorage = require("./localstorage.js");

var _display = require("./display.js");

var _add = require("./add.js");

var _click = require("./click.js");

var _filterNameAndMonth = require("./filterNameAndMonth.js");

const peps = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json"; //Drag the elements from the html

exports.peps = peps;
const main = document.querySelector("main");
exports.main = main;
const addBtn = document.querySelector(".add");
exports.addBtn = addBtn;
const filterNameInput = document.querySelector("#name");
exports.filterNameInput = filterNameInput;
const filterMonthInput = document.querySelector("#month");
exports.filterMonthInput = filterMonthInput;
let result = [];
exports.result = result;

function updateResult(newResult) {
  exports.result = result = newResult;
}

async function fetchPeople() {
  let response = await fetch(peps);
  let data = await response.json();
  exports.result = result = data;
  (0, _display.displayPeopleBirthdayList)(result);
  main.dispatchEvent(new CustomEvent("itemUpdated"));
  (0, _localstorage.restoreFromLocalStorage)(result);
  window.addEventListener("click", _click.handleClick);
  addBtn.addEventListener("click", _add.addListOfPeople);
  filterNameInput.addEventListener("input", _filterNameAndMonth.filterByNamesAndMonths);
  filterMonthInput.addEventListener("change", _filterNameAndMonth.filterByNamesAndMonths);
  main.addEventListener("itemUpdated", _localstorage.setItemOfBirthdayToLocalStorage);
  (0, _localstorage.restoreFromLocalStorage)();
}

fetchPeople();
},{"./localstorage.js":"BirthdayApp/localstorage.js","./display.js":"BirthdayApp/display.js","./add.js":"BirthdayApp/add.js","./click.js":"BirthdayApp/click.js","./filterNameAndMonth.js":"BirthdayApp/filterNameAndMonth.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64275" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","BirthdayApp/script.js"], null)
//# sourceMappingURL=/script.f5d3da1d.js.map