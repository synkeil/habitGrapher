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
	  var _this = this;

	  this.date = new Date();
	  this.year = this.date.getFullYear();
	  this.month = this.date.getMonth();
	  this.day = this.date.getDate();

	  this.init = function () {
	    _this.year = _this.date.getFullYear();
	    _this.month = _this.date.getMonth();
	    _this.day = _this.date.getDate();
	  };
	};

	var cal = new Calendar();
	var monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	var weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	var hoursArr = [];
	var cycle = function cycle(elem, range) {
	  // cycle elements went out of range
	  if (elem > range) {
	    return elem % range;
	  }
	  return elem;
	};
	var clear = function clearTheDom(elemToClear) {
	  // clearing the dom element
	  var elMac = elemToClear;
	  var newBoxMac = elMac.cloneNode(false);
	  elMac.parentNode.replaceChild(newBoxMac, elMac);
	  elMac = newBoxMac;
	};

	// iteration variables;
	var i = 0;
	var j = 0;
	var k = 0;

	// initiating the hours array
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
	  leapCheck(1);
	  monthArr.map(function (x) {
	    iQ('#macroContent').append('<p> ' + x + ' </p><ul class="month' + j + '" ></ul>');
	    for (i = 0; i < dayInMonthArray[j]; i += 1) {
	      cal.date = new Date(cal.year, j, i);
	      iQ('.month' + j).append('<li>' + weekArr[cal.date.getDay()] + ' (' + (i + 1) + ')</li>');
	    }
	    j += 1;
	    return monthArr;
	  });
	};

	// function to set the calendar in year view
	var yearView = function initInYearView(_ref) {
	  var titleElem = _ref.titleElem;
	  var contentElem = _ref.contentElem;
	  var calendarObject = _ref.calendarObject;

	  // check for leap year
	  leapCheck(1);
	  // reset iterators
	  j = 0;
	  k = 0;
	  // clear the dom
	  clear(iQ(titleElem).dom());
	  clear(iQ(contentElem).dom());

	  // append the scope (year/month/week/day)
	  iQ(titleElem).append(calendarObject.year);

	  monthArr.map(function (x) {
	    // iterate over each elem of the array
	    // set date to current month
	    calendarObject.date = new Date(calendarObject.year, j, 1);
	    calendarObject.init();
	    console.log();
	    // set the number of the first monday
	    var prevMonthLen = dayInMonthArray[(j + 11) % 12];
	    var currentMonthLen = dayInMonthArray[(j + 12) % 12];
	    var nextMonthLen = dayInMonthArray[(j + 13) % 12];
	    var sundayToMonday = cycle(calendarObject.date.getDay() + 7, 7) - 1;
	    var prevMonthDif = prevMonthLen + sundayToMonday;
	    var curMonthDif = currentMonthLen + sundayToMonday;
	    var nextMonthDif = nextMonthLen + sundayToMonday;
	    var strartingDigit = prevMonthDif > prevMonthLen - 1 ? prevMonthLen - (sundayToMonday - 1) : curMonthDif;
	    var digit = 1;
	    console.log('the month of ' + monthArr[calendarObject.month] + ' starts on the ' + strartingDigit);

	    //console.log(`in ${calendarObject.date} there are : ${dayInMonthArray[((j + 12) % 12)]} days and the first monday is a : ${strartingDigit}, and there are a total of ${dayInMonthArray[((j + 11) % 12)]} days in the previous month`);

	    // appending month cells/ days prep
	    iQ(contentElem).append('<div class="monthCell"><p>' + x + '</p><div class="dayLabels"></div><div class="dayDigits"></div></div>');

	    // append the weekdays shorthand
	    weekArrSrt.map(function (y) {
	      iQ('.dayLabels').eq(j + 1).append('<div>' + y + '</div>');
	      return weekArrSrt;
	    });

	    // cycle the days digits
	    for (k = 0; k < 42; k += 1) {
	      if (k < sundayToMonday) {
	        digit = strartingDigit + k;
	      } else {
	        digit = cycle(k - (prevMonthLen - strartingDigit), currentMonthLen);
	      }
	      if (strartingDigit === 0) {
	        digit = cycle(k, currentMonthLen);
	      }

	      // set date to current day
	      calendarObject.date = new Date(calendarObject.year, calendarObject.month, digit);
	      // append the day's digits
	      iQ('.dayDigits').eq(j + 1).append('<div>' + digit + '</div>');
	    }
	    j += 1;
	    return monthArr;
	  });
	};

	// trigger year mode on click
	iQ('#yearButton').listen('click', function () {
	  yearView({ titleElem: '#macroContent', contentElem: '#microContent' });
	});
	// trigger fancy mode on click
	iQ('#fancyButton').listen('click', function () {
	  fancyView();
	});

	// default view
	yearView({ titleElem: '#macroContent', contentElem: '#microContent', calendarObject: cal });

/***/ }
/******/ ]);