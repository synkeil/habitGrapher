const monthArr = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
const dayInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArr = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const hoursArr = [];
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let i=0,j=0,k=0,l=0;

for(i=0;i<24;i++){
  hoursArr.push(i+"h:");
}

const leapCheck = function checkForLeapYear(check){ // Check for leap year and adjust feb days
  if (check === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
      dayInMonthArray[1] = 29;
    }
  }
}


const fancyCal = function initInFancyMode(){

  monthArr.map(


    (x)=>{

      leapCheck(j);

      iQ("#macroContent").append("<p>"+x+"</p><ul class='month"+j+"'></ul>");
      for(i=0;i<dayInMonthArray[j];i++){
        date = new Date(year,j,i);
        iQ(".month"+j).append("<li>"+weekArr[date.getDay()]+" "+(i+1)+"</li>");
      }
      j++;
    }

  );
}

const yearView = function initInYearView(check){

  iQ("#macroContent").append(year);

  monthArr.map(


    (x)=>{

      leapCheck(j);

      iQ("#microContent").append("<div class='monthCell'>"+x+"</div>");

      j++;

    }

  );

}

yearView();
