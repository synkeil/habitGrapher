class CalState {
  constructor(label) {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = {
      name: label,
      number: this.date.getMonth(),
      days: [],
      day: [],
    };
    this.dayName = [];
  }
  init() {
    this.year = this.date.getFullYear();
    this.month.number = this.date.getMonth();
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
let calArray = {};

// create a new calendar object
const calStateInit = function populateCurrentYearState() {
  calArray = new CalState(monthArr);
  calArray.setArrays();
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
    if ((calArray.year % 4 === 0 && calArray.year % 100 !== 0) || calArray.year % 400 === 0) {
      dayInMonthArray[1] = 29;
    }
  }
};

// function to set the calendar in year view
const yearInit = function initInYearView() {
  // check for leap year
  calStateInit();
  leapCheck(1);

  const refDate = new Date(calArray.year, 0, 1);
  // reset iterators
  j = 0;
  k = 0;

  // iterate over each elem of the array
  monthArr.map(
    () => {
      // set date to current month
      refDate.setMonth(j);
      refDate.setDate(1);
      calArray.date.setDate(1);
      calArray.init();
      refDate.setFullYear(calArray.year);

      // set the number of the first monday
      const prevMonthLen = dayInMonthArray[((j + 11) % 12)];
      const currentMonthLen = dayInMonthArray[((j + 12) % 12)];
      const sundayToMonday = (cycle((calArray.date.getDay() + 7), 7) - 1);
      const prevMonthDif = prevMonthLen + sundayToMonday;
      const curMonthDif = currentMonthLen + sundayToMonday;
      const strartingDigit = prevMonthDif > (prevMonthLen - 1) ?
       (prevMonthLen - (sundayToMonday - 1)) : curMonthDif;
      let digit = 1;

      // cycle the days digits
      for (k = 0; k < 42; k += 1) {
        // refDate.setFullYear(calArray.year);
        // refDate.setMonth(j);
        // starts prev month
        if (k <= sundayToMonday) {
          if (j === 0) {
            // refDate.setFullYear((refDate.getFullYear() - 1));
          }
          digit = strartingDigit + k;
          // refDate.setMonth(cycle((j + 11), 11));
          // refDate.setDate(digit);
          calArray.init();
        } else {
          // is current month
          digit = cycle((k - (prevMonthLen - strartingDigit)), currentMonthLen);
          // refDate.setMonth(j);
          // refDate.setDate(digit);
          calArray.init();
        }
        if (strartingDigit === 0) {
          // is next month
          if (k > dayInMonthArray[calArray.month.number]) {
            if (j === 11) {
              // refDate.setFullYear((refDate.getFullYear() + 1));
            }
            // refDate.setMonth(cycle((j + 1), 11));
            // refDate.setDate(digit);
            calArray.init();
          }
          digit = cycle(k, currentMonthLen);
        }

        // populate the current month's days array with the appropriate series of numbers
        calArray.month.days[j].push(digit);
        calArray.month.day[j].push(calArray.date.getDay());
        calArray.dayName[j].push(dayInMonthArray[calArray.month.day]);

        // set date to current day
        calArray.init();
      }
      console.log(`after : ${refDate}`);
      j += 1;
      return monthArr;
    }
  );
};

const renderYear = function renderTheYearView({ titleElem, contentElem }) {
  console.log(calArray);
  // reset iterators
  j = 0;
  k = 0;

  // clear the dom
  clear(iQ(titleElem).dom());
  clear(iQ(contentElem).dom());

  // append the scope (year/month/week/day)
  iQ(titleElem).append(calArray.year);

  // iterate over each exlem of the array
  calArray.month.name.map(
    (x) => {
      // appending month cells/ days prep
      iQ(contentElem).append(`<div class="monthCell"><p>${x}</p><div class="dayLabels"></div><div class="dayDigits"></div></div>`);

      // append the weekdays shorthand
      weekArrSrt.map(
        (y) => {
          iQ('.dayLabels').eq(j + 1).append(`<div>${y}</div>`);
          return weekArrSrt;
        }
      );

      // cycle the days digits
      calArray.month.days[j].map((y) => {
        iQ('.dayDigits').eq(j + 1).append(`<div>${y}</div>`);
        return calArray.month.days;
      });

      j += 1;
      return monthArr;
    }
  );
};

const renderMonth = function renderTheMonthView({ titleElem, contentElem }) {
  console.log(calArray);
  // reset iterators
  j = 0;
  k = 0;

  // clear the dom
  clear(iQ(titleElem).dom());
  clear(iQ(contentElem).dom());

  // append the scope (year/month/week/day)
  iQ(titleElem).append(calArray.month.name[calArray.month.number]);

  // iterate over each exlem of the array
  calArray.dayName.map(
    (x) => {
      // appending day cells/ days prep
      iQ(contentElem).append(`<div class="dayCell"><p>${x}</p><div class="daydigit">${calArray.month.day[j]}</div></div>`);

      j += 1;
      return monthArr;
    }
  );
};

const yearView = function initAndRenderYear({ contentElemSup, titleElemSup }) {
  yearInit();
  renderYear({
    contentElem: contentElemSup, titleElem: titleElemSup,
  });
};

const monthView = function initAndRenderMonth({ contentElemSup, titleElemSup }) {
  yearInit();
  renderMonth({
    contentElem: contentElemSup, titleElem: titleElemSup,
  });
};
// trigger year mode on click
iQ('#yearButton').listen('click', () => { yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });
iQ('#monthButton').listen('click', () => { monthView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' }); });

// default view
yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });
