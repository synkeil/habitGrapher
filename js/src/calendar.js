const monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const hoursArr = [];
let mode = 0;

// iteration variables;
let i = 0;
let j = 0;
// let k = 0;
let l = 0;

// year counter
let count = 0;

// initiating the hours array
for (i = 0; i < 24; i += 1) {
  hoursArr.push(`${i}h`);
}

// clearing the dom element
const clear = function clearTheDom(elemToClear) {
  let elMac = elemToClear;
  const newBoxMac = elMac.cloneNode(false);
  elMac.parentNode.replaceChild(newBoxMac, elMac);
  elMac = newBoxMac;
};

const calLib = [];

const ref = new Date();
// month counter
let mCount = ref.getMonth();


class CalYear {
  constructor(dateSet) {
    this.date = dateSet;
    this.year = ref.getFullYear();
    this.days = [];
    this.day = [];
    this.dayName = [];
    this.dateFull = [];
  }
  init() {
    this.year = this.date.getFullYear();
  }
  setArrays() {
    for (let m = 0; m < 12; m += 1) {
      this.days.push([]);
      this.day.push([]);
      this.dayName.push([]);
      this.dateFull.push([]);
    }
  }
}

function calInit(span) {
  count = (span / 2);
  for (i = 0; i < span; i += 1) {
    // populate the array with objects at date -/+ (span / 2)
    calLib.push(
      new CalYear(new Date(((ref.getFullYear() - (span / 2)) + i), 0, 1))
    );
  }
  l = 0;
  calLib.map(
    (x) => {
      x.init();
      x.setArrays();

      x.date = new Date(((ref.getFullYear() - (span / 2)) + l), 0, 1);

      // check for leap year
      if (
        (x.year % 4 === 0 && x.year % 100 !== 0) ||
        x.year % 400 === 0) {
        dayInMonthArray[1] = 29;
      } else {
        dayInMonthArray[1] = 28;
      }

      for (j = 0; j < 12; j += 1) {
        x.date = new Date(((ref.getFullYear() - (span / 2)) + l), j, 1);
        for (i = 0; i < dayInMonthArray[j]; i += 1) {
          // increment the reference day
          x.date = new Date(((ref.getFullYear() - (span / 2)) + l), j, i + 1);
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
    }
  );
}

const renderYear = function renderTheFullYear({ titleElemSup, contentElemSup }) {
  // shorthands
  const prevYear = calLib[count - 1];
  const curYear = calLib[count];
  const nextYear = calLib[count + 1];

  // check for leap year
  if (
    (curYear.year % 4 === 0 && curYear.year % 100 !== 0) ||
    curYear.year % 400 === 0) {
    dayInMonthArray[1] = 29;
  } else {
    dayInMonthArray[1] = 28;
  }

  // reset iterators
  j = 0;

  // append the year to the title bar
  $(titleElemSup).append(curYear.year);

  // append the months
  monthArr.map(
    (x) => {
      // append the months name and prepare the dom for the rest
      $(contentElemSup).append(`<div class="monthCell"><p>${x}</p><div class="dayLabels"></div><div class="dayDigits"></div></div>`);

      // append the day shorthand to the calendar
      weekArrSrt.map(
        (y) => {
          $('.dayLabels').eq(j + 1).append(`<div>${y}</div>`);
          return weekArrSrt;
        }
      );

      // append the date to the calendar
      for (i = 0; i < 42; i += 1) {
        let digit = 0;
        switch (true) {
          // day overflow
          case (i > ((dayInMonthArray[j] - 1) + curYear.day[j][0])):
            if (j === 11) {
              digit = nextYear.days[0][i - dayInMonthArray[0]] - curYear.day[j][0];
            } else {
              digit = curYear.days[j][i - dayInMonthArray[j]] - curYear.day[j][0];
            }
            break;
          // not on monday
          case (curYear.day[j][0] > i):
            if (j === 0) {
              digit = prevYear.days[11][dayInMonthArray[11] - (curYear.day[j][0] - i)];
            } else {
              digit = curYear.days[j - 1][dayInMonthArray[j - 1] - (curYear.day[j][0] - i)];
            }
            break;
          default:
            digit = (i - curYear.day[j][0]) + 1;
        }
        $('.dayDigits').eq(j + 1).append(`<div>${digit}</div>`);
      }

      j += 1;
      return monthArr;
    }
  );
};

const renderFancy = function renderCalAndDetails() {};
const renderMonth = function renderMonthDetailedView({
  titleElemSup: first,
  contentElemSup: second,
}) {
  const curYear = calLib[count];

  // render month title
  $(first).append(monthArr[mCount]);

  i = 1;
  // append global blueprint
  curYear.dayName[mCount].map(
    (x) => {
      $(second).append(
        `<div class="mvDayCell"><p class="mvDlabel">${x}</p><p class="mvDdigit">${i}</p></div>`
      );
      i += 1;
      return curYear.dayName[mCount];
    }
  );
  console.log(curYear);
};
const renderWeek = function renderWeekDetailedView() {};
const renderDay = function renderDayDetailedView() {};

// counter management
const countUp = function setYearCounterUp() {
  // check view mode selected
  switch (mode) {
    case (0):
      count += 1;
      break;
    case (1):
      fCount += 1;
      break;
    case (2):
      if (mCount === 11) {
        count += 1;
        mCount = 0;
      } else {
        mCount += 1;
      }
      break;
    case (3):
      wCount += 1;
      break;
    default:
      dCount += 1;
  }
};
const countDown = function setYearCounterDown() {
  // check view mode selected
  switch (mode) {
    case (0):
      count -= 1;
      break;
    case (1):
      fCount -= 1;
      break;
    case (2):
      if (mCount === 0) {
        count -= 1;
        mCount = 11;
      } else {
        mCount -= 1;
      }
      break;
    case (3):
      wCount -= 1;
      break;
    default:
      dCount -= 1;
  }
};

const build = function initTheCalAndRender(first, second) {
  clear($(first).dom());
  clear($(second).dom());

  // check view mode selected
  switch (mode) {
    case (0):
      renderYear({ titleElemSup: first, contentElemSup: second });
      break;
    case (1):
      renderFancy({ titleElemSup: first, contentElemSup: second });
      break;
    case (2):
      renderMonth({ titleElemSup: first, contentElemSup: second });
      break;
    case (3):
      renderWeek({ titleElemSup: first, contentElemSup: second });
      break;
    default:
      renderDay({ titleElemSup: first, contentElemSup: second });
  }
};

const initBase = function setUpBaseView() {
  calInit(80);
  build('#macroContent', '#microContent');
};

$('#fancyButton').listen('click', () => {
  mode = 1; build('#macroContent', '#microContent');
});
$('#yearButton').listen('click', () => {
  mode = 0; build('#macroContent', '#microContent');
});
$('#monthButton').listen('click', () => {
  mode = 2; build('#macroContent', '#microContent');
});
$('#weekButton').listen('click', () => {
  mode = 3; build('#macroContent', '#microContent');
});
$('#dayButton').listen('click', () => {
  mode = 4; build('#macroContent', '#microContent');
});

$('#next').listen('click', () => {
  countUp();
  build('#macroContent', '#microContent');
});
$('#prev').listen('click', () => {
  countDown();
  build('#macroContent', '#microContent');
});

initBase();

// const test = new Date(2016, 1, 1);
// console.log(test);
