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
	      number: [],
	      days: [],
	      day: [],
	      monthCellLayout: []
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
	        this.month.monthCellLayout.push([]);
	        this.month.number.push(m);
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
	// let l = 0;
	var count = 0;

	// initiating the hours array
	for (i = 0; i < 24; i += 1) {
	  hoursArr.push(i + 'h');
	}

	// the calendar object instence recipient
	var calInstance = {};

	// create a new calendar object
	var calStateInit = function populateCurrentYearState() {
	  calInstance = new CalState(monthArr);
	  calInstance.setArrays();
	};

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

	var populate = function initAndAssignFullCalendar() {
	  // shorthands
	  var mLayout = calInstance.month.monthCellLayout;
	  var days = calInstance.month.days;
	  var day = calInstance.month.day;
	  var dayName = calInstance.dayName;

	  // set the year dynamicly
	  calInstance.refDate.setFullYear(calInstance.year + count);

	  j = 0;

	  // set up the arrays in the month (12 arrays of days/names/day)
	  calInstance.month.name.map(function () {
	    leapCheck(1);

	    // setup the arrays
	    calInstance.refDate.setMonth(j);
	    calInstance.refDate.setDate(0);
	    days[j].push([]);
	    day[j].push([]);
	    dayName[j].push([]);

	    for (i = 0; i < dayInMonthArray[j]; i += 1) {
	      // increment the reference day
	      calInstance.refDate.setDate(i + 1);
	      // set the date's digit of the current day
	      days[j][i] = i + 1;
	      // set the day of the week of the current day
	      day[j][i] = calInstance.refDate.getDay();
	      // set the label of the current day
	      dayName[j][i] = weekArr[calInstance.refDate.getDay()];
	    }

	    var startingDate = day[j][0];

	    var digit = 0;
	    for (k = 0; k < 42; k += 1) {
	      // check month for congruence
	      if (startingDate > k) {
	        digit = dayInMonthArray[cycle(j + 11, 11)] - (startingDate - (k - 1));
	      } else {
	        digit = days[j][cycle(k, dayInMonthArray[j] - 1)];
	      }
	      mLayout[j].push(digit);
	    }

	    j += 1;
	    return calInstance;
	  });
	};

	var renderY = function renderTheFullYear(_ref) {
	  var titleElemSup = _ref.titleElemSup;
	  var contentElemSup = _ref.contentElemSup;

	  // shorthands
	  var mLayout = calInstance.month.monthCellLayout;

	  // reset iterators
	  j = 0;
	  k = 0;

	  // append the year to the title bar
	  $(titleElemSup).append(calInstance.year);

	  // append the months
	  monthArr.map(function (x) {
	    // append the months name and prepare the dom for the rest
	    $(contentElemSup).append('<div class="monthCell"><p>' + x + '</p><div class="dayLabels"></div><div class="dayDigits"></div></div>');

	    // append the day shorthand to the calendar
	    weekArrSrt.map(function (y) {
	      $('.dayLabels').eq(j + 1).append('<div>' + y + '</div>');
	      return weekArrSrt;
	    });

	    // append the date to the calendar
	    mLayout[j].map(function (z) {
	      $('.dayDigits').eq(j + 1).append('<div>' + z + '</div>');
	      return mLayout[j];
	    });
	    j += 1;
	    return monthArr;
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

	// counter management
	var countUp = function setYearCounterUp() {
	  count += 1;
	};
	var countDown = function setYearCounterDown() {
	  count -= 1;
	};
	build({ title: '#macroContent', content: '#microContent' });

	// trigger year mode on click
	$('#yearButton').listen('click', function () {
	  yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });
	});

	// trigger month mode on click
	$('#monthButton').listen('click', function () {
	  monthView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });
	});

	// cycle year/month on click
	$('#prev').listen('click', function () {
	  countDown();
	});
	$('#next').listen('click', function () {
	  countUp();
	});
	// default view
	// yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });
	console.log(calInstance);

/***/ }
/******/ ]);