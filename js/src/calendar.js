const Calendar = function calendarMainObject() {
  this.date = new Date();
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  this.day = this.date.getDate();

  this.init = () => {
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
  };
};

const cal = new Calendar();
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
const clear = function clearTheDom(elemToClear) { // clearing the dom element
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

const leapCheck = function checkForLeapYear(check) { // Check for leap year and adjust feb days
  if (check === 1) {
    if ((cal.year % 4 === 0 && cal.year % 100 !== 0) || cal.year % 400 === 0) {
      dayInMonthArray[1] = 29;
    }
  }
};


const fancyView = function initInFancyMode() { // function to set the calendar in fancy mode
  leapCheck(1);
  monthArr.map(
    (x) => {
      iQ('#macroContent').append(`<p> ${x} </p><ul class="month${j}" ></ul>`);
      for (i = 0; i < dayInMonthArray[j]; i += 1) {
        cal.date = new Date(cal.year, j, i);
        iQ(`.month${j}`).append(`<li>${weekArr[cal.date.getDay()]} (${i + 1})</li>`);
      }
      j += 1;
      return monthArr;
    }
  );
};

// function to set the calendar in year view
const yearView = function initInYearView({ titleElem, contentElem, calendarObject }) {
  // check for leap year
  leapCheck(1);
  // reset iterators
  j = 0;
  k = 0;
  // clear the dom
  clear(iQ(titleElem).dom());
  clear(iQ(contentElem).dom());

  // append the scope (year/month/week/day)
  iQ(titleElem).append(calendarObject.year);

  monthArr.map(
    (x) => { // iterate over each elem of the array
      // set date to current month
      calendarObject.date = new Date(calendarObject.year, j, 1);
      calendarObject.init();
      console.log();
      // set the number of the first monday
      const prevMonthLen = dayInMonthArray[((j + 11) % 12)];
      const currentMonthLen = dayInMonthArray[((j + 12) % 12)];
      const nextMonthLen = dayInMonthArray[((j + 13) % 12)];
      const sundayToMonday = (cycle((calendarObject.date.getDay() + 7), 7) - 1);
      const prevMonthDif = prevMonthLen + sundayToMonday;
      const curMonthDif = currentMonthLen + sundayToMonday;
      const nextMonthDif = nextMonthLen + sundayToMonday;
      const strartingDigit = prevMonthDif > (prevMonthLen - 1) ?
       (prevMonthLen - (sundayToMonday - 1)) : curMonthDif;
      let digit = 1;
      console.log(`the month of ${monthArr[calendarObject.month]} starts on the ${strartingDigit}`);

      //console.log(`in ${calendarObject.date} there are : ${dayInMonthArray[((j + 12) % 12)]} days and the first monday is a : ${strartingDigit}, and there are a total of ${dayInMonthArray[((j + 11) % 12)]} days in the previous month`);

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
      for (k = 0; k < 42; k += 1) {
        if (k < sundayToMonday) {
          digit = strartingDigit + k;
        } else {
          digit = cycle((k - (prevMonthLen - strartingDigit)), currentMonthLen);
        }
        if (strartingDigit === 0) {
          digit = cycle(k, currentMonthLen);
        }

        // set date to current day
        calendarObject.date = new Date(calendarObject.year, calendarObject.month, digit);
        // append the day's digits
        iQ('.dayDigits').eq(j + 1).append(`<div>${digit}</div>`);
      }
      j += 1;
      return monthArr;
    }
  );
};

// trigger year mode on click
iQ('#yearButton').listen('click', () => { yearView({ titleElem: '#macroContent', contentElem: '#microContent' }); });
// trigger fancy mode on click
iQ('#fancyButton').listen('click', () => { fancyView(); });

// default view
yearView({ titleElem: '#macroContent', contentElem: '#microContent', calendarObject: cal });
