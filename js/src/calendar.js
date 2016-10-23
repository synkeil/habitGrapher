class CalState {
  constructor(label) {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.refDate = new Date(this.year, 0, 1);
    this.month = {
      name: label,
      number: [],
      days: [],
      day: [],
      monthCellLayout: [],
    };
    this.dayName = [];
  }
  init() {
    this.year = this.date.getFullYear();
  }
  setArrays() {
    for (let m = 0; m < 12; m += 1) {
      this.month.monthCellLayout.push([]);
      this.month.number.push(m);
      this.month.days.push([]);
      this.month.day.push([]);
      this.dayName.push([]);
    }
  }
}

const monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const hoursArr = [];

// cycle elements wen out of range
const cycle = (elem, range) => {
  if (elem > range) {
    return (elem % range);
  }
  return elem;
};

// iteration variables;
let i = 0;
let j = 0;
let k = 0;
// let l = 0;
let count = 0;

// initiating the hours array
for (i = 0; i < 24; i += 1) {
  hoursArr.push(`${i}h`);
}

// the calendar object instence recipient
let calInstance = {};

// create a new calendar object
const calStateInit = function populateCurrentYearState() {
  calInstance = new CalState(monthArr);
  calInstance.setArrays();
};

// clearing the dom element
const clear = function clearTheDom(elemToClear) {
  let elMac = elemToClear;
  const newBoxMac = elMac.cloneNode(false);
  elMac.parentNode.replaceChild(newBoxMac, elMac);
  elMac = newBoxMac;
};

// Check for leap year and adjust feb days
const leapCheck = function checkForLeapYear(check) {
  if (check === 1) {
    if (
      (calInstance.year % 4 === 0 && calInstance.year % 100 !== 0) ||
      calInstance.year % 400 === 0) {
      dayInMonthArray[1] = 29;
    } else {
      dayInMonthArray[1] = 28;
    }
  }
};

const populate = function initAndAssignFullCalendar() {
  // shorthands
  const mLayout = calInstance.month.monthCellLayout;
  const days = calInstance.month.days;
  const day = calInstance.month.day;
  const dayName = calInstance.dayName;
  const year = calInstance.year;

  // set the year dynamicly
  calInstance.refDate.setFullYear(calInstance.year + count);

  j = 0;

  // set up the arrays in the month (12 arrays of days/names/day)
  calInstance.month.name.map(
    () => {
      leapCheck(1);

      // setup the arrays
      calInstance.refDate.setMonth(j);
      calInstance.refDate.setDate(0);
      days[j].push([]);
      day[j].push([]);
      dayName[j].push([]);

      for (i = 0; i < (dayInMonthArray[j]); i += 1) {
        // increment the reference day
        calInstance.refDate.setDate(i + 1);
        // set the date's digit of the current day
        days[j][i] = i + 1;
        // set the day of the week of the current day
        day[j][i] = calInstance.refDate.getDay();
        // set the label of the current day
        dayName[j][i] = weekArr[calInstance.refDate.getDay()];
      }

      const startingDate = day[j][0];

      let digit = 0;
      for (k = 0; k < 40; k += 1) {
        // check month for congruence
        switch (true) {
          // where k goes over the max # of days in the current month
          case (k > (dayInMonthArray[j] - (startingDate))):
            if (j === 11) {
              digit = days[0][(k - dayInMonthArray[11]) - (startingDate + 1)];
              digit =
            } else {
              digit = days[(j + 1)][0];
              console.log(days[(j + 1)][1]);
            }
            break;
          // where the first day to display is from the previous month
          // case ((startingDate + 1) > k):
          //   if (j === 0) {
          //     digit = days[11][(dayInMonthArray[11] - (startingDate)) + k];
          //   } else {
          //     digit = days[j - 1][(dayInMonthArray[j - 1] - (startingDate)) + k];
          //   }
          //   break;
          default:
          //   digit = days[j][k - (startingDate)];
        }
        mLayout[j].push(digit);
      }

      j += 1;
      return calInstance;
    }
  );
};

const renderY = function renderTheFullYear({ titleElemSup, contentElemSup }) {
  // shorthands
  const mLayout = calInstance.month.monthCellLayout;

  // reset iterators
  j = 0;
  k = 0;

  // append the year to the title bar
  $(titleElemSup).append(calInstance.year);

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
      mLayout[j].map(
        (z) => {
          $('.dayDigits').eq(j + 1).append(`<div>${z}</div>`);
          return mLayout[j];
        }
      );
      j += 1;
      return monthArr;
    }
  );
};

const build = function initiatAndRenderDocument({ title, content }) {
  calStateInit();
  leapCheck();
  populate();
  renderY({ titleElemSup: title, contentElemSup: content });
};

const yearView = function initAndDisplayFullYear({ titleElemSup, contentElemSup }) {
  // reset the dom
  clear(titleElemSup);
  clear(contentElemSup);
};

const monthView = function initAndDisplayMonth({ titleElemSup, contentElemSup }) {
  // reset the dom
  clear(titleElemSup);
  clear(contentElemSup);
};

// counter management
const countUp = function setYearCounterUp() {
  count += 1;
};
const countDown = function setYearCounterDown() {
  count -= 1;
};
build({ title: '#macroContent', content: '#microContent' });

// trigger year mode on click
$('#yearButton').listen('click', () => { yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });

// trigger month mode on click
$('#monthButton').listen('click', () => { monthView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });

// cycle year/month on click
$('#prev').listen('click', () => { countDown(); });
$('#next').listen('click', () => { countUp(); });
// default view
// yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });
console.log(calInstance);
