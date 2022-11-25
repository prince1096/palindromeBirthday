const dateInput = document.querySelector("#bday-input");
const button = document.querySelector("#button");
const output = document.querySelector("#output");

function reverseStr(str) {
  let reversedString = str.split("").reverse().join("");

  return reversedString;
}

function isPalindrome(str) {
  let reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.day.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForDate(date) {
  let listOfPalindromes = getAllDateFormats(date);

  var palindromeList = [];

  let flagPost = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    let result = isPalindrome(listOfPalindromes[i]);
    palindromeList.push(result);
  }

  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextpalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  //   let isPalindromeFlag = false;

  while (1) {
    ctr++;
    var dateStr = convertDateToStr(nextDate);
    var resultList = checkPalindromeForDate(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

// let date = {
//   day: 31,
//   month: 12,
//   year: 2020,
// };

// console.log(getAllDateFormats(date));

// console.log(checkPalindromeForDate(date));

// console.log(getNextDate(date));

// console.log(getNextpalindromeDate(date));

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month = month - 1;

    if (month === 0) {
      month = 12;
      date = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  let ctr = 0;
  let previousDate = getPreviousDate(date);

  while (1) {
    ctr++;
    let dateStr = convertDateToStr(previousDate);
    let resultList = checkPalindromeForDate(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }

    previousDate = getPreviousDate(previousDate);
  }
}

function clickHandler(e) {
  console.log();

  let bdayStr = dateInput.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var dateStr = convertDateToStr(date);
    var list = checkPalindromeForDate(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [ctr1, nextDate] = getNextpalindromeDate(date);
      const [ctr2, prevDate] = getPreviousPalindromeDate(date);

      if (ctr1 > ctr2) {
        console.log("1");
        output.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
      } else {
        console.log("2");
        output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
      }
    }
    if (isPalindrome) {
      console.log("3");
      output.innerText = `Yay! Your birthday is palindrome!`;
    }

    // var isPalindrome = checkPalindromeForDate(date);

    // if (isPalindrome) {
    //   console.log("1");
    //   output.innerText = "Yay! your birthday is a palindrome🥳";
    // } else {
    //   let [ctr1, nextDate] = getNextpalindromeDate(date);
    //   const [ctr2, prevDate] = getPreviousPalindromeDate(date);

    //   if (ctr1 > ctr2) {
    //     console.log("2");
    //     output.innerText = `The near palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}`;
    //   } else {
    //     console.log("3");
    //     output.innerText = `The near palindrome is ${nextDate.day}- ${nextDate.month}-${nextDate.year}`;
    //   }
  }
}

button.addEventListener("click", clickHandler);
