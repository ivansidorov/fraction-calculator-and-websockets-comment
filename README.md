# Тестовое задание


Собранная версия доступна по [ссылке](https://fraction-calculator-and-websockets-comment.netlify.com/)

## Задание №1

### Текст задания:  
_Необходимо реализовать калькулятор обыкновенных дробей. Слева от знака «=» расположено выражение
Минимальный набор операторов +-*/, скобки будут плюсом, справа от знака равно находится результат в виде
несократимой обыкновенной дроби. При нажатии на ссылку add fraction в выражении слева должен добавиться
один знак и еще одна дробь. При любом изменении данных выражение должно пересчитываться. Необходимо
предусмотреть всевозможные ошибочные варианты ввода._  


### Использванные технологии:

- Vue.js   
Создание интерфейса и работа с DOM 
- [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)      
Необходима для однозначного вычисления математических выражений  
- Webpack       
Преобразование .vue файлов понятный для браузеров бандл
- Babel    
Преобразование современного JS в более старый для лучшей совместимости с браузерами

## Задание №2

### Текст задания:  
_Имеется веб сервер, подключение к которому происходит по протоколу websocket. На сервер посылаются запросы.
Каждый запрос содержит в себе свой номер. Сервер высылает в ответ на каждый запрос номер запроса и
некоторый ответ.
Проблема: сервер может ответить не в том порядке, в котором были сделаны запросы. Каждый ответ сервера
требует уникальных действий на стороне клиента. На какой-то из запросов сервер вообще может не ответить,
необходима проверка (возможность указать таймаут - опционально)
Задача: реализовать асинхронную обработку ответов сервера._    


### Использванные технологии:

- Vue.js   
Создание интерфейса и работа с DOM 
- Websockets   
Для получения и отправки данных на сервер
- Webpack       
Преобразование .vue файлов понятный для браузеров бандл
- Babel    
Преобразование современного JS в более старый для лучшей совместимости с браузерами

### Build Setup
```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
