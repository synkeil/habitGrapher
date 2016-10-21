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
	var calInstance = {};

	// create a new calendar object
	var calStateInit = function populateCurrentYearState() {
	  calInstance = new CalState(monthArr);
	  calInstance.setArrays();
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
	    if (calInstance.year % 4 === 0 && calInstance.year % 100 !== 0 || calInstance.year % 400 === 0) {
	      dayInMonthArray[1] = 29;
	    } else {
	      dayInMonthArray[1] = 28;
	    }
	  }
	};

	var populate = function populateCalendar() {
	  j = 0;
	  // set up the arrays in the month (12 arrays of days/names/day)
	  calInstance.month.name.map(function () {
	    leapCheck(1);
	    calInstance.refDate.setMonth(j);
	    calInstance.refDate.setDate(0);
	    calInstance.month.days[j].push([]);
	    calInstance.month.day[j].push([]);
	    calInstance.dayName[j].push([]);
	    for (i = 0; i < dayInMonthArray[j]; i += 1) {
	      // increment the reference day
	      calInstance.refDate.setDate(i + 1);
	      // set the date's digit of the current day
	      calInstance.month.days[j][i] = i + 1;
	      // set the day of the week of the current day
	      calInstance.month.day[j][i] = calInstance.refDate.getDay();
	      // set the label of the current day
	      calInstance.dayName[j][i] = weekArr[calInstance.refDate.getDay()];
	    }
	    j += 1;
	    return calInstance;
	  });
	};

	var renderY = function renderTheFullYear(_ref) {
	  var titleElemSup = _ref.titleElemSup;
	  var contentElemSup = _ref.contentElemSup;

	  // append the year to the title bar
	  iQ(titleElemSup).append(calInstance.year);

	  // append the months
	  calInstance.month.name.map(function (x) {
	    k = 0;
	    iQ(contentElemSup).append('<div class="monthCell"><p>' + x + '</p><div class="dayLabels"></div><div class="dayDigits"></div></div>');
	    weekArrSrt.map(function (y) {
	      iQ('.dayLabels').eq(k).append(y);
	      k += 1;
	      return weekArrSrt;
	    });
	    return calInstance.month.name;
	  });
	};

	var build = function initiatAndRenderDocument(_ref2) {
	  var title = _ref2.title;
	  var content = _ref2.content;

	  calStateInit();
	  leapCheck();
	  populate();
	  renderY({ titleElemSup: title, contentElemSup: content });
	};

	var yearView = function initAndDisplayFullYear(_ref3) {
	  var titleElemSup = _ref3.titleElemSup;
	  var contentElemSup = _ref3.contentElemSup;

	  // reset the dom
	  clear(titleElemSup);
	  clear(contentElemSup);
	};

	var monthView = function initAndDisplayMonth(_ref4) {
	  var titleElemSup = _ref4.titleElemSup;
	  var contentElemSup = _ref4.contentElemSup;

	  // reset the dom
	  clear(titleElemSup);
	  clear(contentElemSup);
	};

	build({ title: '#macroContent', content: '#microContent' });

	// trigger year mode on click
	// iQ('#yearButton').listen('click', () => { yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });
	// iQ('#monthButton').listen('click', () => { monthView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });

	// default view
	// yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });

	console.log(calInstance);

/***/ }
/******/ ]);