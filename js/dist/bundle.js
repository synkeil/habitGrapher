/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	document.write('working');

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var weekArr = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
	var hoursArr = [];
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var i = 0,
	    j = 0,
	    k = 0,
	    l = 0;

	for (i = 0; i < 24; i++) {
	  hoursArr.push(i + "h:");
	}

	var leapCheck = function checkForLeapYear(check) {
	  // Check for leap year and adjust feb days
	  if (check === 1) {
	    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
	      dayInMonthArray[1] = 29;
	    }
	  }
	};

	var fancyCal = function initInFancyMode() {

	  monthArr.map(function (x) {

	    leapCheck(j);

	    iQ("#macroContent").append("<p>" + x + "</p><ul class='month" + j + "'></ul>");
	    for (i = 0; i < dayInMonthArray[j]; i++) {
	      date = new Date(year, j, i);
	      iQ(".month" + j).append("<li>" + weekArr[date.getDay()] + " " + (i + 1) + "</li>");
	    }
	    j++;
	  });
	};

	var yearView = function initInYearView(check) {

	  iQ("#macroContent").append(year);

	  monthArr.map(function (x) {

	    leapCheck(j);

	    iQ("#microContent").append("<div class='monthCell'>" + x + "</div>");

	    j++;
	  });
	};

	yearView();

/***/ }
/******/ ]);