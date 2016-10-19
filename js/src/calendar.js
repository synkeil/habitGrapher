class CalState {
  constructor(label) {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = {
      name: label,
      number: this.date.getMonth(),
      days: [],
    };
  }
  init() {
    this.year = this.date.getFullYear();
    this.month.number = this.date.getMonth();
    this.day = this.date.getDate();
  }
}

const monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const hoursArr = [];
const cycle = (elem, range) => { // cycle elements went out of range
  if (elem > range) {
    return (elem % range);
  }
  return elem;
};

let calArray = {};

// create a new calendar object
const calStateInit = function populateCurrentYearState() {
  calArray = new CalState(monthArr);
};

// clearing the dom element
const clear = function clearTheDom(elemToClear) {
  let elMac = elemToClear;
  const newBoxMac = elMac.cloneNode(false);
  elMac.parentNode.replaceChild(newBoxMac, elMac);
  elMac = newBoxMac;
};

// iteration variables;
let i = 0;
let j = 0;
let k = 0;

// initiating the hours array
for (i = 0; i < 24; i += 1) {
  hoursArr.push(`${i}h`);
}

// Check for leap year and adjust feb days
const leapCheck = function checkForLeapYear() {
  if ((calArray.year % 4 === 0 && calArray.year % 100 !== 0) || calArray.year % 400 === 0) {
    dayInMonthArray[1] = 29;
    console.log('should be 29');
  }
  console.log('should be 28');
  console.log(calArray.date);
};

// function to set the calendar in year view
const yearInit = function initInYearView() {
  // check for leap year
  calStateInit();
  leapCheck();

  // reset iterators
  j = 0;
  k = 0;

  // iterate over each elem of the array
  monthArr.map(
    () => {
      calArray.month.days.push([]);

      // set date to current month
      calArray.date = new Date(calArray.year, j, 1);
      calArray.init();

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
        if (k < sundayToMonday) {
          digit = strartingDigit + k;
        } else {
          digit = cycle((k - (prevMonthLen - strartingDigit)), currentMonthLen);
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
    }
  );
};

const renderYear = function renderTheYearView({ titleElem, contentElem }) {
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

const yearView = function initAndRenderYear({ contentElemSup, titleElemSup }) {
  yearInit();
  renderYear({
    contentElem: contentElemSup, titleElem: titleElemSup,
  });
};

// trigger year mode on click
iQ('#yearButton').listen('click', () => { yearView({ titleElem: '#macroContent', contentElem: '#microContent' }); });

// default view
yearView({ titleElemSup: '#macroContent', contentElemSup: '#microContent' });
