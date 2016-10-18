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

	var Calendar = function calendarMainObject() {
	  this.date = new Date();
	  this.year = this.date.getFullYear();
	  this.month = this.date.getMonth();
	  this.day = this.date.getDate();
	};

	var cal = new Calendar();
	var monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	var weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	var hoursArr = [];
	var cycle = function cycle(elem, range) {
	  if (elem > range) {
	    return elem % range;
	  }
	  return elem;
	};

	var i = 0;
	var j = 0;
	var k = 0;

	for (i = 0; i < 24; i += 1) {
	  hoursArr.push(i + 'h');
	}

	var leapCheck = function checkForLeapYear(check) {
	  // Check for leap year and adjust feb days
	  if (check === 1) {
	    if (cal.year % 4 === 0 && cal.year % 100 !== 0 || cal.year % 400 === 0) {
	      dayInMonthArray[1] = 29;
	    }
	  }
	};

	var fancyView = function initInFancyMode() {
	  // function to set the calendar in fancy mode
	  monthArr.map(function (x) {
	    leapCheck(j);
	    iQ('#macroContent').append('<p> ' + x + ' </p><ul class="month' + j + '" ></ul>');
	    for (i = 0; i < dayInMonthArray[j]; i += 1) {
	      cal.date = new Date(cal.year, j, i);
	      iQ('.month' + j).append('<li>' + weekArr[cal.date.getDay()] + ' (' + (i + 1) + ')</li>');
	    }
	    j += 1;
	    return monthArr;
	  });
	};

	var yearView = function initInYearView() {
	  // function to set the calendar in year view
	  var elMac = iQ('#macroContent').dom();
	  var elMic = iQ('#microContent').dom();
	  var newBoxMac = elMac.cloneNode(false);
	  var newBoxMic = elMic.cloneNode(false);

	  j = 0;
	  k = 0;

	  elMac.parentNode.replaceChild(newBoxMac, elMac);
	  elMac = newBoxMac;
	  elMic.parentNode.replaceChild(newBoxMic, elMic);
	  elMic = newBoxMic;

	  // append the scope (year/month/week/day)
	  iQ('#macroContent').append(cal.year);

	  monthArr.map(function (x) {
	    // append the month to the main view
	    // check for leap year
	    leapCheck(j);

	    cal.date = new Date(cal.year, j, 1);
	    var strartingDigit = dayInMonthArray[(j + 11) % 12] - cal.date.getDay();
	    var digit = 0;

	    console.log('in ' + cal.date + ' there are : ' + dayInMonthArray[(j + 12) % 12] + ' days and the first monday is a : ' + strartingDigit + ', and there are a total of ' + dayInMonthArray[(j + 11) % 12] + ' days in the previous month');
	    // the actual appending (month cell/ days prep)
	    iQ('#microContent').append('<div class="monthCell"><p>' + x + '</p><div class="dayLabels"></div><div class="dayDigits"></div></div>');

	    weekArrSrt.map(function (y) {
	      // append the weekdays shorthand
	      iQ('.dayLabels').eq(j + 1).append('<div>' + y + '</div>');
	      return weekArrSrt;
	    });

	    for (k = 0; k < 42; k += 1) {
	      // append the day's digits
	      digit = cycle(k + strartingDigit, dayInMonthArray[(j + 12) % 12]);

	      cal.date = new Date(cal.year, cal.month, digit);
	      iQ('.dayDigits').eq(j + 1).append('<div>' + digit + '</div>');
	    }
	    j += 1;
	    return monthArr;
	  });
	};

	iQ('#yearButton').listen('click', function () {
	  yearView();
	});
	iQ('#fancyButton').listen('click', function () {
	  fancyView();
	});

	yearView();

/***/ }
/******/ ]);