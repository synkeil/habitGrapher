const Calendar = function calendarMainObject() {
  this.date = new Date();
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  this.day = this.date.getDate();
};

const cal = new Calendar();
const monthArr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const weekArrSrt = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const hoursArr = [];
const cycle = (elem, range) => {
  if (elem > range) {
    return (elem % range);
  }
  return elem;
};

let i = 0;
let j = 0;
let k = 0;

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
  monthArr.map(
    (x) => {
      leapCheck(j);
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

const yearView = function initInYearView() { // function to set the calendar in year view
  let elMac = iQ('#macroContent').dom();
  let elMic = iQ('#microContent').dom();
  const newBoxMac = elMac.cloneNode(false);
  const newBoxMic = elMic.cloneNode(false);

  j = 0;
  k = 0;

  elMac.parentNode.replaceChild(newBoxMac, elMac);
  elMac = newBoxMac;
  elMic.parentNode.replaceChild(newBoxMic, elMic);
  elMic = newBoxMic;

  // append the scope (year/month/week/day)
  iQ('#macroContent').append(cal.year);

  monthArr.map(
    (x) => { // append the month to the main view
      // check for leap year
      leapCheck(j);

      cal.date = new Date(cal.year, j, 1);
      const strartingDigit = dayInMonthArray[((j + 11) % 12)] - (cal.date.getDay());
      let digit = 0;

      console.log(`in ${cal.date} there are : ${dayInMonthArray[((j + 12) % 12)]} days and the first monday is a : ${strartingDigit}, and there are a total of ${dayInMonthArray[((j + 11) % 12)]} days in the previous month`);
      // the actual appending (month cell/ days prep)
      iQ('#microContent').append(`<div class="monthCell"><p>${x}</p><div class="dayLabels"></div><div class="dayDigits"></div></div>`);

      weekArrSrt.map(
        (y) => { // append the weekdays shorthand
          iQ('.dayLabels').eq(j + 1).append(`<div>${y}</div>`);
          return weekArrSrt;
        }
      );

      for (k = 0; k < 42; k += 1) { // append the day's digits
        digit = cycle(((k) + strartingDigit), dayInMonthArray[((j + 12) % 12)]);

        cal.date = new Date(cal.year, cal.month, digit);
        iQ('.dayDigits').eq(j + 1).append(`<div>${digit}</div>`);

      }
      j += 1;
      return monthArr;
    }
  );
};

iQ('#yearButton').listen('click', () => { yearView(); });
iQ('#fancyButton').listen('click', () => { fancyView(); });

yearView();
