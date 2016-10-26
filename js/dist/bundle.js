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

	var monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	var weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	var hoursArr = [];
	var mode = 0;

	// iteration variables;
	var i = 0;
	var j = 0;
	// let k = 0;
	var l = 0;

	// year counter
	var count = 0;

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

	var calLib = [];

	var ref = new Date();
	// month counter
	var mCount = ref.getMonth();
	var fCount = ref.getFullYear();
	var wCount = ref.getDate() % 7;
	var dCount = ref.getDate();

	var CalYear = function () {
	  function CalYear(dateSet) {
	    _classCallCheck(this, CalYear);

	    this.date = dateSet;
	    this.year = ref.getFullYear();
	    this.days = [];
	    this.day = [];
	    this.dayName = [];
	    this.dateFull = [];
	  }

	  _createClass(CalYear, [{
	    key: 'init',
	    value: function init() {
	      this.year = this.date.getFullYear();
	    }
	  }, {
	    key: 'setArrays',
	    value: function setArrays() {
	      for (var m = 0; m < 12; m += 1) {
	        this.days.push([]);
	        this.day.push([]);
	        this.dayName.push([]);
	        this.dateFull.push([]);
	      }
	    }
	  }]);

	  return CalYear;
	}();

	function calInit(span) {
	  count = span / 2;
	  for (i = 0; i < span; i += 1) {
	    // populate the array with objects at date -/+ (span / 2)
	    calLib.push(new CalYear(new Date(ref.getFullYear() - span / 2 + i, 0, 1)));
	  }
	  l = 0;
	  calLib.map(function (x) {
	    x.init();
	    x.setArrays();

	    x.date = new Date(ref.getFullYear() - span / 2 + l, 0, 1);

	    // check for leap year
	    if (x.year % 4 === 0 && x.year % 100 !== 0 || x.year % 400 === 0) {
	      dayInMonthArray[1] = 29;
	    } else {
	      dayInMonthArray[1] = 28;
	    }

	    for (j = 0; j < 12; j += 1) {
	      x.date = new Date(ref.getFullYear() - span / 2 + l, j, 1);
	      for (i = 0; i < dayInMonthArray[j]; i += 1) {
	        // increment the reference day
	        x.date = new Date(ref.getFullYear() - span / 2 + l, j, i + 1);
	        // set the date's digit of the current day
	        x.days[j].push(i + 1);
	        // set the day of the week of the current day
	        x.day[j].push((x.date.getDay() + 6) % 7);
	        // set the label of the current day
	        x.dayName[j].push(weekArr[(x.date.getDay() + 6) % 7]);
	      }
	    }
	    l += 1;
	    return calLib;
	  });
	}

	var renderYear = function renderTheFullYear(_ref) {
	  var titleElemSup = _ref.titleElemSup,
	      contentElemSup = _ref.contentElemSup;

	  // shorthands
	  var prevYear = calLib[count - 1];
	  var curYear = calLib[count];
	  var nextYear = calLib[count + 1];

	  // check for leap year
	  if (curYear.year % 4 === 0 && curYear.year % 100 !== 0 || curYear.year % 400 === 0) {
	    dayInMonthArray[1] = 29;
	  } else {
	    dayInMonthArray[1] = 28;
	  }

	  // reset iterators
	  j = 0;

	  // append the year to the title bar
	  $(titleElemSup).append(curYear.year);

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
	    for (i = 0; i < 42; i += 1) {
	      var digit = 0;
	      switch (true) {
	        // day overflow
	        case i > dayInMonthArray[j] - 1 + curYear.day[j][0]:
	          if (j === 11) {
	            digit = nextYear.days[0][i - dayInMonthArray[0]] - curYear.day[j][0];
	          } else {
	            digit = curYear.days[j][i - dayInMonthArray[j]] - curYear.day[j][0];
	          }
	          break;
	        // not on monday
	        case curYear.day[j][0] > i:
	          if (j === 0) {
	            digit = prevYear.days[11][dayInMonthArray[11] - (curYear.day[j][0] - i)];
	          } else {
	            digit = curYear.days[j - 1][dayInMonthArray[j - 1] - (curYear.day[j][0] - i)];
	          }
	          break;
	        default:
	          digit = i - curYear.day[j][0] + 1;
	      }
	      $('.dayDigits').eq(j + 1).append('<div>' + digit + '</div>');
	    }

	    j += 1;
	    return monthArr;
	  });
	};

	var renderFancy = function renderCalAndDetails() {};
	var renderMonth = function renderMonthDetailedView(_ref2) {
	  var first = _ref2.titleElemSup,
	      second = _ref2.contentElemSup;

	  var curYear = calLib[count];

	  // render month title
	  $(first).append(monthArr[mCount]);

	  i = 1;
	  // append global blueprint
	  curYear.dayName[mCount].map(function (x) {
	    $(second).append('<div class="mvDayCell"><p class="mvDlabel">' + x + '</p><p class="mvDdigit">' + i + '</p></div>');
	    i += 1;
	    return curYear.dayName[mCount];
	  });
	};
	var renderWeek = function renderWeekDetailedView(_ref3) {
	  var first = _ref3.titleElemSup,
	      second = _ref3.contentElemSup;

	  var curYear = calLib[count];
	  var curMonth = curYear.dayName[mCount];

	  // display week
	  $(first).append(monthArr[mCount]);
	};
	var renderDay = function renderDayDetailedView(_ref4) {
	  var first = _ref4.titleElemSup,
	      second = _ref4.contentElemSup;

	  var curYear = calLib[count];
	  var curMonth = curYear.dayName[mCount];
	  var curDay = curMonth[dCount];
	};

	// counter management
	var countUp = function setYearCounterUp() {
	  // check view mode selected
	  switch (mode) {
	    case 0:
	      count += 1;
	      break;
	    case 1:
	      fCount += 1;
	      break;
	    case 2:
	      if (mCount === 11) {
	        count += 1;
	        mCount = 0;
	      } else {
	        mCount += 1;
	      }
	      break;
	    case 3:
	      wCount += 1;
	      break;
	    default:
	      dCount += 1;
	  }
	};
	var countDown = function setYearCounterDown() {
	  // check view mode selected
	  switch (mode) {
	    case 0:
	      count -= 1;
	      break;
	    case 1:
	      fCount -= 1;
	      break;
	    case 2:
	      if (mCount === 0) {
	        count -= 1;
	        mCount = 11;
	      } else {
	        mCount -= 1;
	      }
	      break;
	    case 3:
	      wCount -= 1;
	      break;
	    default:
	      dCount -= 1;
	  }
	};

	var getIndex = function getTheIndexOfCurrentElement(elem) {
	  var children = elem.parentNode.childNodes;
	  var num = 0;
	  for (i = 0; i < children.length; i += 1) {
	    if (children[i] === elem) return num;
	    if (children[i].nodeType === 1) num += 1;
	  }
	  return num;
	};

	var build = function initTheCalAndRender(first, second, third) {
	  clear($(first).dom());
	  clear($(second).dom());

	  // check view mode selected
	  switch (mode) {
	    case 0:
	      renderYear({ titleElemSup: first, contentElemSup: second });
	      break;
	    case 1:
	      renderFancy({ titleElemSup: first, contentElemSup: second });
	      break;
	    case 2:
	      renderMonth({ titleElemSup: first, contentElemSup: second });
	      break;
	    case 3:
	      renderWeek({ titleElemSup: first, contentElemSup: second });
	      break;
	    default:
	      renderDay({ titleElemSup: first, contentElemSup: second });
	  }

	  /*
	    // listeners to get the index of the selected day/month/year
	  */

	  // month in year mode
	  $('.monthCell').listen('click', function listenToMonth() {
	    mCount = getIndex(this);
	    mode = 2;
	    build('#macroContent', '#microContent');
	    console.log(mCount);
	  });
	  // Day in month mode
	  $('.mvDayCell').listen('click', function listenToDayInM() {
	    dCount = getIndex(this);
	    mode = 3;
	    // build('#macroContent', '#microContent');
	    $('p').removeClass('selectedDayDigit');
	    this.childNodes[1].classList.add('selectedDayDigit');
	    console.log(dCount);
	  });
	};

	var initBase = function setUpBaseView() {
	  calInit(80);
	  build('#macroContent', '#microContent');
	};

	initBase();

	$('#yearButton').listen('click', function () {
	  mode = 0;build('#macroContent', '#microContent');
	});
	$('#monthButton').listen('click', function () {
	  mode = 2;build('#macroContent', '#microContent');
	});
	$('#next').listen('click', function () {
	  countUp();
	  build('#macroContent', '#microContent');
	});
	$('#prev').listen('click', function () {
	  countDown();
	  build('#macroContent', '#microContent');
	});

	$('.monthCell').listen('click', function listenForClickInYearView() {
	  mCount = getIndex(this);
	  mode = 2;
	  build('#macroContent', '#microContent');
	  console.log(mCount);
	});

/***/ }
/******/ ]);