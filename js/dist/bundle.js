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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CalState = function () {
	  function CalState(label) {
	    _classCallCheck(this, CalState);

	    this.date = new Date();
	    this.year = this.date.getFullYear();
	    this.refDate = new Date(this.year, 0, 1);
	    this.month = {
	      name: label,
	      days: [],
	      day: []
	    };
	    this.dayName = [];
	  }

	  _createClass(CalState, [{
	    key: 'init',
	    value: function init() {
	      this.year = this.date.getFullYear();
	    }
	  }, {
	    key: 'setArrays',
	    value: function setArrays() {
	      for (var m = 0; m < 12; m += 1) {
	        this.month.days.push([]);
	        this.month.day.push([]);
	        this.dayName.push([]);
	      }
	    }
	  }]);

	  return CalState;
	}();

	var monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	var weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	var hoursArr = [];

	// cycle elements wen out of range
	var cycle = function cycle(elem, range) {
	  if (elem > range) {
	    return elem % range;
	  }
	  return elem;
	};

	// iteration variables;
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;

	// the calendar object instence recipient
	var calInstence = {};

	// create a new calendar object
	var calStateInit = function populateCurrentYearState() {
	  calInstence = new CalState(monthArr);
	  calInstence.setArrays();
	};

	// initiating the hours array
	for (i = 0; i < 24; i += 1) {
	  hoursArr.push(i + 'h');
	}

	// clearing the dom element
	var clear = function clearTheDom(elemToClear) {
	  var elMac = elemToClear;
	  var newBoxMac = elMac.cloneNode(false);
	  elMac.parentNode.replaceChild(newBoxMac, elMac);
	  elMac = newBoxMac;
	};

	// Check for leap year and adjust feb days
	var leapCheck = function checkForLeapYear(check) {
	  if (check === 1) {
	    if (calInstence.year % 4 === 0 && calInstence.year % 100 !== 0 || calInstence.year % 400 === 0) {
	      dayInMonthArray[1] = 29;
	    } else {
	      dayInMonthArray[1] = 28;
	    }
	  }
	};

	var populate = function populateCalendar() {
	  j = 0;
	  // set up the arrays in the month (12 arrays of days/names/day)
	  calInstence.month.name.map(function () {
	    leapCheck(1);
	    calInstence.refDate.setMonth(j);
	    calInstence.refDate.setDate(0);
	    calInstence.month.days[j].push([]);
	    calInstence.month.day[j].push([]);
	    calInstence.dayName[j].push([]);
	    for (i = 0; i < dayInMonthArray[j]; i += 1) {
	      // increment the reference day
	      calInstence.refDate.setDate(i + 1);
	      // set the date's digit of the current day
	      calInstence.month.days[j][i] = i + 1;
	      // set the day of the week of the current day
	      calInstence.month.day[j][i] = calInstence.refDate.getDay();
	      // set the label of the current day
	      calInstence.dayName[j][i] = weekArr[calInstence.refDate.getDay()];
	    }
	    j += 1;
	    return calInstence;
	  });
	};

	var build = function initiatAndRenderDocument() {
	  calStateInit();
	  leapCheck();
	  populate();
	};

	build();

	// trigger year mode on click
	// iQ('#yearButton').listen('click', () => { yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });
	// iQ('#monthButton').listen('click', () => { monthView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });

	// default view
	// yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });

	console.log(calInstence);

/***/ }
/******/ ]);