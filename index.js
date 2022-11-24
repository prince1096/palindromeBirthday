function reverseStr(str) {
  let reversedStr = str.split("").reverse().join("");

  return reversedStr;
}

function isPalindrome(str) {
  let reverse = reverseStr(str);

  return str === reverse;
}

function convertDateToStr(date) {}
