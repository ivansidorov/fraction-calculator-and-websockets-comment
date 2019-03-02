/*
*
* Обpатная польская нотация
* https://en.wikipedia.org/wiki/Reverse_Polish_notation
*
*/


import * as math from './math.js';

/*
*
* Вычисление значения выражения преобразованного в обpатную польскую запись
* Возвращает обьект сожержащий числитель и знаменатель вычисленной дроби
* @param {Array} postfixArr
* @returns {Object} res
*
*/


const parse = postfixArr => {
    let res = {
        numinator: 1,
        denominator: 1
    };

    const operators = {
        '+': (x, y) => math.sum(x, y),
        '-': (x, y) => math.sub(x, y),
        '*': (x, y) => math.multiply(x, y),
        '/': (x, y) => math.divide(x, y)
    };

    let stack = [];
    postfixArr.forEach(token => {
        if (token.type === 'operation') {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token.signVariation](x, y));
        } else {
            stack.push(token);
        }
    });
    res = stack.pop();
    return res;
}

/*
*
* Преобразование входящего массива в обратную польскую запись
* Возвращает массив приведённый к обратной польской записи
* @param {Array} tokens
* @returns {Array} postFix
*
*/

const generate =  tokens => {
    var postFix = [];
    var operationsStack = [];

    Array.prototype.peek = function () {
        return this.slice(-1)[0];
    };

    var prec = {
        "/": {
            precedence: 3
        },
        "*": {
            precedence: 3
        },
        "+": {
            precedence: 2
        },
        "-": {
            precedence: 2
        }
    };

    tokens.forEach(function (token) {

        //Если дробь, то добавляем её в очередь
        if (token.type === 'operand') {
            postFix.push(token);
        }
        //Если оператор, то определяем его "вес" и добавляем в в очередь
        else if (token.type == "operation" && prec[token.signVariation] !== undefined) {
            let op1 = token;
            let op2 = operationsStack[operationsStack.length - 1];
            while (op2 && (operationsStack.peek().type === "operation") && prec[op1.signVariation].precedence <= prec[op2.signVariation].precedence) {
                postFix.push(operationsStack.pop());
                op2 = operationsStack[operationsStack.length - 1];
            }
            operationsStack.push(op1);
        }

        //Если открывающая скобка, то добавляем её в очередь
        else if (token.type === "LP") {
            operationsStack.push(token);
        }
        //Если закрывающая скобка, то ищем открывающую и добавляем все элементы в очередб
        else if (token.type === "RP") {
            //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
            while (operationsStack.peek() &&
                operationsStack.peek().type !== "LP") {
                postFix.push(operationsStack.pop());
            }
            operationsStack.pop();
        }
    });
    return postFix.concat(operationsStack.reverse());
}


/*
*
* Вычисление выражения
* Возвращает обьект сожержащий числитель и знаменатель вычисленной дроби
* @param {Array} arr
* @returns {Array}
*
*/

const calculate = arr => {
    return parse(generate(arr))
}

export {calculate}