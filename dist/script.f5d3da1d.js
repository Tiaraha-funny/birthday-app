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
const editSvg = `<svg class="edit" width="40px" height="40px" fill="#2cb67d" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`;
exports.editSvg = editSvg;
const deleteSvg = `<svg class="delete" width="40px" height="40px" fill="#f25042" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
exports.deleteSvg = deleteSvg;
const cakeSvg = `<svg class="w-6 h-6" fill="#ffd803" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>`;
exports.cakeSvg = cakeSvg;
},{}],"BirthdayApp/display.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPeopleBirthdayList = displayPeopleBirthdayList;

var _script = require("./script.js");

var _svg = require("./icons-SVGs/svg.js");

// Maping all the people in the list from the fetch function
function displayPeopleBirthdayList(event, filterName, filterMonth) {
  let sortedBirthday = _script.result.sort((sooner, later) => later.birthday - sooner.birthday); // DO THE FILTERING HERE


  if (filterName) {
    sortedBirthday = sortedBirthday.filter(birth => {
      let lowerCaseName = birth.firstName.toLowerCase();
      let lowerCaseFilter = filterName.toLowerCase();
      console.log(lowerCaseFilter);

      if (lowerCaseName.includes(lowerCaseFilter)) {
        return true;
      } else {
        return false;
      }
    });
  } else if (filterMonth) {
    sortedBirthday = sortedBirthday.filter(birth => {
      let newMonth = new Date(birth.birthday);
      let moths = newMonth.toLocaleString("en-us", {
        month: "long"
      });
      let lowerCaseMonth = moths.toLowerCase();
      let lowerCaseFilter = filterMonth.toLowerCase();
      console.log(lowerCaseFilter);

      if (lowerCaseMonth == lowerCaseFilter) {
        return true;
      } else {
        return false;
      }
    });
  }

  _script.main.innerHTML = sortedBirthday.map(person => {
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
    var mymonth = birthDate.getMonth();
    var myYear = birthDate.getFullYear();
    var ageResult = `${myYear}/${mymonth}/${day}`;
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


    const oneDay = 24 * 60 * 60 * 1000;
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

    const notDayNow = Math.round(Math.abs((new Date(daysBirth) - new Date(today)) / oneDay));
    return `
        <ul data-id="${person.id}" class="d-flex flex-row justify-content-around list-unstyled">
          <li class=""><img class="rounded-circle" src="${person.picture}" alt="images"></li>
          <li class="names"><b>${person.lastName} ${person.firstName}</b><br>Turns ${age} on ${dateOfBirth} <sup> ${getSymboleDate(daysBirth)} ${month}  </sup></li>
          <li>${ageResult}</li>
          <li class="">${_svg.cakeSvg} ${notDayNow} Days</li>
          <li class="edit">
            <button type="button" name="edit" class="edit">${_svg.editSvg}
          </li>
          <li class="delete">
            <button type="button" class="delete">${_svg.deleteSvg}
          </button>
          </li>
        </ul>
      `;
  }).join("");
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
  console.log("restoring from the local storage");
  let lsItems = JSON.parse(localStorage.getItem("result")); //check if the there's something inside the local storage

  if (lsItems) {
    let result = lsItems;
    result;
  } else {
    let response = await fetch(`${_script.peps}`);
    let data = await response.json();
    let result = [...data];
    (0, _display.displayPeopleBirthdayList)(result);
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
      <div class="form">
        <h2>Do you want to add this lists?</h2>
        <label>Enter the picture URL</labe><br>
        <input type="url" name="picture" id="picture"><br>
        <label>Enter the last Name</labe><br>
        <input type="text" name="lastName" id="lastName"><br>
        <label>Enter the first name</labe><br>
        <input type="text" name="firstName" id="firstName"><br>
        <label>Enter the birthday</labe><br>
        <input type="date" name="birthday" id="birthday"><br>
      <div class="buttons">
        <button type="submit addBtn">Submit</button>
        <button type="button" name="cancel">Cancel</button>
      </div>
      <small>You are going to see your new list at the end!!</small>
    </div>
  `;
    popup.innerHTML = addHtml;
    resolve();
    popup.addEventListener("submit", e => {
      e.preventDefault();
      console.log("This is the submit");
      console.log(_script.result);
      const formEl = e.currentTarget;
      const newBirthday = {
        picture: formEl.picture.value,
        lastName: formEl.lastName.value,
        firstName: formEl.firstName.value,
        birthday: formEl.birthday.value,
        id: Date.now()
      };

      _script.result.push(newBirthday);

      (0, _display.displayPeopleBirthdayList)();
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);

      _script.main.dispatchEvent(new CustomEvent("itemUpdated"));

      formEl.reset();
    });

    if (popup.cancel) {
      console.log("No I don't want to delete");
      popup.cancel.addEventListener("click", function () {
        resolve(null);
        (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
      }, {
        once: true
      });
      resolve(document.body.appendChild(popup));
      popup.classList.add("open");

      _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
    }

    window.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        popup.classList.remove("open");
      }
    });
  });
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

  const personToEdit = _script.result.find(person => person.id === id);

  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("person");
    const editHtml = `
    <div class="form">
      <h2>Do you want to edit something?</h2>
      <label>URL of the picture:</labe><br>
      <input type="url" name="picture" id="picture" value="${personToEdit.picture}"><br>
      <label>Last Name:</labe><br>
      <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}"><br>
      <label>First name:</labe><br>
      <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}"><br>
      <label>Birthday:</labe><br>
      <input type="text" name="birthday" id="birthday" value="${personToEdit.birthday}"><br>
      <div class="buttons">
        <button type="submit">Save</button>
        <button type="button" name="cancel">Cancel</button>
      </div>
    </div>
  `;
    popup.insertAdjacentHTML("afterbegin", editHtml);
    popup.addEventListener("submit", e => {
      e.preventDefault();
      resolve();
      personToEdit.picture = popup.picture.value;
      personToEdit.lastName = popup.lastName.value;
      personToEdit.firstName = popup.firstName.value;
      personToEdit.birthday = popup.birthday.value;
      resolve(e.currentTarget.remove());
      (0, _display.displayPeopleBirthdayList)(_script.result);
      (0, _destroy.destroyModalEditDeleteOrCancel)(popup);
    }, {
      once: true
    });

    if (popup.cancel) {
      console.log("Cancel button is clicked");
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
function deletePersonBirthday(id) {
  console.log("Delete button is clicked");
  return new Promise(function (resolve) {
    const popup = document.createElement("form");
    popup.classList.add("person");
    const delHtml = `
      <article>
        <h2>Do you want to delete this person?</h2>
        <div class="delBtn">
          <div class="yes">
          <button type="button" class="yesDel" name="yes">YES</button>
          </div>
          <div>
          <button type="button" name="cancel">Cancel</button>
          </div>
        </div>
      </article>
      `;
    popup.innerHTML = delHtml;
    popup.addEventListener("click", e => {
      e.preventDefault();

      if (e.target.matches("button.yesDel")) {
        console.log("I am ready to delete this one");

        const people = _script.result.filter(person => person.id !== id);

        (0, _display.displayPeopleBirthdayList)(people);
        (0, _destroy.destroyModalEditDeleteOrCancel)(popup);

        _script.main.dispatchEvent(new CustomEvent("itemUpdated"));
      }
    }, {
      once: true
    });

    if (popup.cancel) {
      console.log("No I don't want to delete");
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
  localStorage.clear();

  if (e.target.closest("button.edit")) {
    console.log("You are able to edit anything");
    const parent = e.target.closest("ul");
    const id = parent.dataset.id;
    (0, _edit.editPersonBirthday)(id);
  }

  if (e.target.closest("button.delete")) {
    console.log("You are able to delete");
    const parent = e.target.closest("ul");
    const id = parent.dataset.id;
    (0, _delete.deletePersonBirthday)(id);
  }
};

exports.handleClick = handleClick;
},{"./edit.js":"BirthdayApp/edit.js","./delete.js":"BirthdayApp/delete.js"}],"BirthdayApp/script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPeople = fetchPeople;
exports.addBtn = exports.main = exports.result = exports.peps = void 0;

var _localstorage = require("./localstorage.js");

var _display = require("./display.js");

var _add = require("./add.js");

var _click = require("./click.js");

// import peps from "./people.json"
//Fetch all the people in the list
const peps = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json"; //Drag the elements from the html

exports.peps = peps;
const main = document.querySelector("main");
exports.main = main;
const addBtn = document.querySelector(".add");
exports.addBtn = addBtn;
const filterForm = document.querySelector(".filter_birthday");
const filterNameInput = document.querySelector("#name");
const filterMonthInput = document.querySelector("#month");
const resetBtn = document.querySelector(".filterbtn");

const resetFilters = e => {
  console.log("Do I click it");
  filterForm.reset(e);
  (0, _display.displayPeopleBirthdayList)();
};

const filterList = e => {
  (0, _display.displayPeopleBirthdayList)(e, filterNameInput.value, filterMonthInput.value);
};

let result = [];
exports.result = result;

async function fetchPeople() {
  let response = await fetch(peps);
  let data = await response.json();
  exports.result = result = data; // restoreFromLocalStorage(result);

  (0, _display.displayPeopleBirthdayList)(result);
  main.dispatchEvent(new CustomEvent("itemUpdated"));
  window.addEventListener("click", _click.handleClick);
  addBtn.addEventListener("click", _add.addListOfPeople);
  filterNameInput.addEventListener('change', filterList);
  filterMonthInput.addEventListener('change', filterList);
  resetBtn.addEventListener("click", resetFilters);
  main.addEventListener("itemUpdated", _localstorage.setItemOfBirthdayToLocalStorage);
  (0, _display.displayPeopleBirthdayList)();
  (0, _localstorage.restoreFromLocalStorage)();
}

fetchPeople();
},{"./localstorage.js":"BirthdayApp/localstorage.js","./display.js":"BirthdayApp/display.js","./add.js":"BirthdayApp/add.js","./click.js":"BirthdayApp/click.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52255" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","BirthdayApp/script.js"], null)
//# sourceMappingURL=/script.f5d3da1d.js.map