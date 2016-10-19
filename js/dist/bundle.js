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
	    this.month = {
	      name: label,
	      number: this.date.getMonth(),
	      days: []
	    };
	  }

	  _createClass(CalState, [{
	    key: 'init',
	    value: function init() {
	      this.year = this.date.getFullYear();
	      this.month.number = this.date.getMonth();
	      this.day = this.date.getDate();
	    }
	  }]);

	  return CalState;
	}();

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

	var calArray = {};

	// create a new calendar object
	var calStateInit = function populateCurrentYearState() {
	  calArray = new CalState(monthArr);
	};

	// clearing the dom element
	var clear = function clearTheDom(elemToClear) {
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

	// Check for leap year and adjust feb days
	var leapCheck = function checkForLeapYear() {
	  if (calArray.year % 4 === 0 && calArray.year % 100 !== 0 || calArray.year % 400 === 0) {
	    dayInMonthArray[1] = 29;
	    console.log('should be 29');
	  }
	  console.log('should be 28');
	  console.log(calArray.date);
	};

	// function to set the calendar in year view
	var yearInit = function initInYearView() {
	  // check for leap year
	  calStateInit();
	  leapCheck();

	  // reset iterators
	  j = 0;
	  k = 0;

	  // iterate over each elem of the array
	  monthArr.map(function () {
	    calArray.month.days.push([]);

	    // set date to current month
	    calArray.date = new Date(calArray.year, j, 1);
	    calArray.init();

	    // set the number of the first monday
	    var prevMonthLen = dayInMonthArray[(j + 11) % 12];
	    var currentMonthLen = dayInMonthArray[(j + 12) % 12];
	    var sundayToMonday = cycle(calArray.date.getDay() + 7, 7) - 1;
	    var prevMonthDif = prevMonthLen + sundayToMonday;
	    var curMonthDif = currentMonthLen + sundayToMonday;
	    var strartingDigit = prevMonthDif > prevMonthLen - 1 ? prevMonthLen - (sundayToMonday - 1) : curMonthDif;
	    var digit = 1;

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

	      // populate the current month's days array with the appropriate series of numbers
	      calArray.month.days[j].push(digit);

	      // set date to current day
	      calArray.date = new Date(calArray.year, calArray.month.number, digit);
	      calArray.init();
	    }
	    j += 1;
	    return monthArr;
	  });
	};

	var renderYear = function renderTheYearView(_ref) {
	  var titleElem = _ref.titleElem;
	  var contentElem = _ref.contentElem;

	  // reset iterators
	  j = 0;
	  k = 0;

	  // clear the dom
	  clear(iQ(titleElem).dom());
	  clear(iQ(contentElem).dom());

	  // append the scope (year/month/week/day)
	  iQ(titleElem).append(calArray.year);

	  // iterate over each exlem of the array
	  calArray.month.name.map(function (x) {
	    // appending month cells/ days prep
	    iQ(contentElem).append('<div class="monthCell"><p>' + x + '</p><div class="dayLabels"></div><div class="dayDigits"></div></div>');

	    // append the weekdays shorthand
	    weekArrSrt.map(function (y) {
	      iQ('.dayLabels').eq(j + 1).append('<div>' + y + '</div>');
	      return weekArrSrt;
	    });

	    // cycle the days digits
	    calArray.month.days[j].map(function (y) {
	      iQ('.dayDigits').eq(j + 1).append('<div>' + y + '</div>');
	      return calArray.month.days;
	    });

	    j += 1;
	    return monthArr;
	  });
	};

	var yearView = function initAndRenderYear(_ref2) {
	  var contentElemSup = _ref2.contentElemSup;
	  var titleElemSup = _ref2.titleElemSup;

	  yearInit();
	  renderYear({
	    contentElem: contentElemSup, titleElem: titleElemSup
	  });
	};

	// trigger year mode on click
	iQ('#yearButton').listen('click', function () {
	  yearView({ titleElem: '#macroContent', contentElem: '#microContent' });
	});

	// default view
	yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });

/***/ }
/******/ ]);