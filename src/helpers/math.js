/*
*
* Вспомогательные математические функции
*
*/


/*
*
* Поиск наименьшего общего кратного
* @param {Array} arr
*
*/
const findNOK = arr => {
    var  n = arr.length, a = Math.abs(arr[0]);
    for (var i = 1; i < n; i++)
     { var b = Math.abs(arr[ i ]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; } 
       a = Math.abs(c*arr[ i ])/(a+b);
     }
    return a;
}

/*
*
* Поиск наибольшего общего делителя
* @param {Array} arr
*
*/
const findNOD = arr => {
    var n = arr.length, x = Math.abs(arr[0]);
    for (var i = 1; i < n; i++)
     { var y = Math.abs(arr[ i ]);
       while (x && y){ x > y ? x %= y : y %= x; }
       x += y;
     }
    return x;
}

const returnFraction = {
    type: 'operand',
    isResult: false,
    numerator: '',
    denominator: ''
  };


/*
*
* Умножение дробей
* @param {Array} (x,y)
*
*/
const multiply = (x,y) => {
returnFraction.numerator = +x.numerator * +y.numerator;
returnFraction.denominator = +x.denominator * +y.denominator;
return returnFraction;
};

/*
*
* Деление дробей
* @param {Array} (x,y)
*
*/
const divide = (x,y) => {
returnFraction.numerator = +x.numerator * +y.denominator;
returnFraction.denominator = +x.denominator * +y.numerator;
return returnFraction;
};


/*
*
* Сложение дробей
* @param {Array} (x,y)
*
*/
const sum = (x, y) => {
const nok = findNOK([x.denominator, y.denominator]);
returnFraction.numerator = +x.numerator*(nok/x.denominator) + +y.numerator*(nok/y.denominator);
returnFraction.denominator = nok;
return returnFraction;

};

/*
*
* Вычитание дробей
* @param {Array} (x,y)
*
*/
const sub = (x, y) => {
const nok = findNOK([x.denominator, y.denominator]);
returnFraction.numerator = +x.numerator*(nok/x.denominator) - +y.numerator*(nok/y.denominator);
returnFraction.denominator = nok;
return returnFraction;
};

export {findNOK, findNOD,multiply,divide,sum,sub}