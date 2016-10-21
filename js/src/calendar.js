class CalState {
  constructor(label) {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.refDate = new Date(this.year, 0, 1);
    this.month = {
      name: label,
      days: [],
      day: [],
    };
    this.dayName = [];
  }
  init() {
    this.year = this.date.getFullYear();
  }
  setArrays() {
    for (let m = 0; m < 12; m += 1) {
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
let l = 0;

// the calendar object instence recipient
let calInstance = {};

// create a new calendar object
const calStateInit = function populateCurrentYearState() {
  calInstance = new CalState(monthArr);
  calInstance.setArrays();
};

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

const populate = function populateCalendar() {
  j = 0;
  // set up the arrays in the month (12 arrays of days/names/day)
  calInstance.month.name.map(
    () => {
      leapCheck(1);
      calInstance.refDate.setMonth(j);
      calInstance.refDate.setDate(0);
      calInstance.month.days[j].push([]);
      calInstance.month.day[j].push([]);
      calInstance.dayName[j].push([]);
      for (i = 0; i < (dayInMonthArray[j]); i += 1) {
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
    }
  );
};

const renderY = function renderTheFullYear({ titleElemSup, contentElemSup }) {
  // append the year to the title bar
  iQ(titleElemSup).append(calInstance.year);

  // append the months
  calInstance.month.name.map(
    (x) => {
      k = 0;
      iQ(contentElemSup).append(`<div class="monthCell"><p>${x}</p><div class="dayLabels"></div><div class="dayDigits"></div></div>`);
      weekArrSrt.map(
        (y) => {
          iQ('.dayLabels').eq(k).append(y);
          k += 1;
          return weekArrSrt;
        }
      );
      return calInstance.month.name;
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

build({ title: '#macroContent', content: '#microContent' });

// trigger year mode on click
// iQ('#yearButton').listen('click', () => { yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });
// iQ('#monthButton').listen('click', () => { monthView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });

// default view
// yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });

console.log(calInstance);
