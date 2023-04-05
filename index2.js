const dateInput = document.querySelector("#bday-input");
const button = document.querySelector("#button");
const output = document.querySelector("#output");

button.addEventListener("click", clickHandler);

console.log(typeof dateInput.value);
console.log(typeof dateInput);

function clickHandler(e) {
  let bdayStr = dateInput.value;
  console.log(bdayStr);
  console.log(typeof bdayStr);

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    console.log(date);

    const ans = convertDateToStr(date);
    console.log(ans);
    console.log(typeof ans);

    // const formats1 = getAllDateFormats(bdayStr);
    // console.log(formats1);

    const formats2 = getAllDateFormats(ans);
    console.log(formats2);
  }
}

function reverseStr(str) {
  const reversedString = str.split("").reverse().join("");
  return reversedString;
}

function isPalindrome(str) {
  const reverseAns = reverseStr(str);
  return reverseAns === str;
}

function convertDateToStr(date) {
  const dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(dateStr) {
  // let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  // console.log(ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd);

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
