//Функция для проверки длины строки
function stringLengthCheck(stringItem, stringLength){
  const result = stringItem.length <= stringLength ? 'строка проходит по длине' : 'строка не проходит';
  return result;
}

stringLengthCheck('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом
function palindromCheck(stringItem){
  stringItem = stringItem.replace(/\s/g,'').toLowerCase();
  let newString = '';
  for(let i = stringItem.length - 1; i >= 0; i--) {
    newString += stringItem[i];
  }
  const result = stringItem === newString ? 'строка является палиндромом' : 'это не палиндром';
  return result;
}

palindromCheck('Лёша на полке клопа нашёл ');

/*
  Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
  и возвращает их в виде целого положительного числа.
  Если в строке нет ни одной цифры, функция должна вернуть NaN:
*/
function getExtractNumber(string){
  string = String(string);
  let resultNumber = '';
  for(let i = 0; i <= string.length - 1; i++) {
    if(string[i] >= '0' && string[i] <= '9') {
      resultNumber += string[i];
    }
  }
  if(resultNumber === '') {
    return NaN;
  }
  return +resultNumber;
}

getExtractNumber('2023 год');

/*
  Функция, которая принимает три параметра:
   - исходную строку,
   - минимальную длину
   - строку с добавочными символами
  возвращает исходную строку, дополненную указанными символами до заданной длины.
  Символы добавляются в начало строки.
  Если исходная строка превышает заданную длину, она не должна обрезаться.
  Если «добивка» слишком длинная, она обрезается с конца.
*/
function addItemString(string, minLength, addItem) {
  const newStringLength = minLength - (string.length);
  let result = '';
  let newResult = '';
  for(let i = 0; i <= newStringLength - 1; i++) {
    result += addItem.slice(i, i + 1);
  }
  if (result.length + string.length < minLength) {
    for(let i = 0; i <= (newStringLength - result.length) - 1; i++) {
      if(addItem.length === 1) {
        newResult += addItem.slice(0, 1);
      } else {
        newResult += addItem.slice(i, i + 1);
      }
    }
  }
  return newResult + result + string;
}

addItemString('1', 4, '0');
