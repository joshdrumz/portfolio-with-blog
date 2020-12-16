---
title: Useful debugging tools in JavaScript besides console.log()
category: Coding
excerpt: Find out how to use the JavaScript console object to your advantage besides console.log()
created: 2020-12-17
keywords: 'JavaScript,Console,HTMl,CSS,Software Engineering,Software,Leetcode,Interview,Whiteboard,College,Coding,Programming'
image: ./images/console-log/heading.png
image_caption: Photo by Josh Arrants
author: author1
---

When working with JavaScript projects, you were most likely introduced to `console.log()`, which is a way to log the output of a variable or post a useful message to the [Browser Console](https://developer.mozilla.org/en-US/docs/Tools/Browser_Console). However, there are tons of other methods of the console object that you're able to use to debug your JS code. There's a reference of all available console object methods on the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Console).

## console.assert()

This method logs a message and stack trace to the console **only** if the first argument is false.  
It's quite useful for logging error messages based on a condition.

```js {6}
let x = 1;
let y = 2;
let z = 3;

function isOdd(num) {
  console.assert((num % 2 === 0), 'Number is odd!');
}

isOdd(x); // output: Number is odd!
isOdd(y); // output: 
isOdd(z); // output: Number is odd!
```

## console.count()

This method logs the number of times this line has been called with the given label.  
It's useful for counting the amount of times a method has been called.  
There's an optional parameter that counts the number of times it's been called with it's label.

```js {4}
let person = '';

function greet() {
  console.count(person);
  return `hi ${person}`;
}

person = 'josh';
greet();
person = 'steve';
greet();
greet();
console.count('steve');
```

Console output would look something like this:

```bash
"josh: 1"
"steve: 1"
"steve: 2"
"steve: 3"
```

You can also reset the value of the counter with the optional label parameter with `console.countReset()`.

## console.error()

This method logs an error message to the console and displays as an error in the browser console.  
It's very useful for testing code where you would want to indicate a code-breaking error.

```js {3}
if (!user.isAuthenticated) {
  res.redirect('/');
  console.error('Scary error! You are not authenticated. Please check your credentials!');
}
```

![console.error()](https://res.cloudinary.com/josharrants/image/upload/v1608098328/josharrants.com/console-log/console-error-pic_pkx92f.png#thumbnail)

## console.group() & console.groupEnd()

This method creates a new inline _group_ of log messages to the console. 

This will continue to indent following console messages by an additional level until `console.groupEnd()` is called. 

`console.group()` is useful when you have a collection of messages that need to be kept together. Proving the group with a label is also optional but informative at the same time.

```js {3}
// without a label
console.log('Group without a label');
console.group();
console.log('First message');
console.log('Second message');
console.log('Third message');
console.groupEnd();
```

![console.group() without a label](https://res.cloudinary.com/josharrants/image/upload/v1608099519/josharrants.com/console-log/console-group-1_cqujwg.png#thumbnail)

```js
// with a label
console.log('Group with a label');
console.group('Group Label');
console.log('First message');
console.log('Second message');
console.log('Third message');
console.groupEnd();
```

![console.group() with a label](https://res.cloudinary.com/josharrants/image/upload/v1608099519/josharrants.com/console-log/console-group-2_h94dtq.png#thumbnail)

## console.table()

This method displays tabular data as a table in the console. It takes one required parameter `data`, which must be an array or object, and one optional parameter `columns`.

It's quite useful for feasibly viewing a set of data without having to export it to an Excel spreadsheet or a `.csv` format.

`data` is a required parameter and should be either an array or an object.  
`columns` is an optional parameter which allows you to select a subset of columns to display.

```js
// an array of strings
console.table(['eggs', 'milk', 'bread']);
```

![an array of strings](https://res.cloudinary.com/josharrants/image/upload/v1608146868/josharrants.com/console-log/console-table-1_e1lzx6.png#thumbnail)

```js
// an object whose properties are strings
function Shoe(size, maleOrFemale, brand) {
  this.size = size;
  this.maleOrFemale = maleOrFemale;
  this.brand = brand;
}

const adidas = new Shoe('12', 'F', 'Adidas');

console.table(adidas);
```

![an object whose properties are strings](https://res.cloudinary.com/josharrants/image/upload/v1608146868/josharrants.com/console-log/console-table-2_shqtje.png#thumbnail)

If elements in an array, or properties of an object, are themselves arrays or objects, their elements or properties are appended in the row, one per column.

```js
// an array of arrays
let groceryList = [['eggs', 'milk'], ['bread', 'cheese'], ['salt', 'pepper']];
console.table(groceryList);
```

![an array of arrays](https://res.cloudinary.com/josharrants/image/upload/v1608146868/josharrants.com/console-log/console-table-3_fqfyjd.png#thumbnail)

```js
// an array of objects
function Shoe(size, maleOrFemale, brand) {
  this.size = size;
  this.maleOrFemale = maleOrFemale;
  this.brand = brand;
}

const adidas = new Shoe('12', 'F', 'Adidas');
const nike = new Shoe('10', 'M', 'Nike');
const reebok = new Shoe('11', 'F', 'Reebok');

console.table([adidas, nike, reebok]);
```

> **Note**: If the array contains objects, the columns will be labeled with the property name.

![an array of objects](https://res.cloudinary.com/josharrants/image/upload/v1608147152/josharrants.com/console-log/console-table-4_ohtkd2.png#thumbnail)

By default, `console.table()` lists all elements in each row. Using the optional `columns` parameter, we can select a subset of columns to display.

```js
// an array of objects, logging only brand
function Shoe(size, maleOrFemale, brand) {
  this.size = size;
  this.maleOrFemale = maleOrFemale;
  this.brand = brand;
}

const adidas = new Shoe('12', 'F', 'Adidas');
const nike = new Shoe('10', 'M', 'Nike');
const reebok = new Shoe('11', 'F', 'Reebok');

console.table([adidas, nike, reebok], ['brand']);
```

![an array of objects, logging only brand](https://res.cloudinary.com/josharrants/image/upload/v1608147646/josharrants.com/console-log/console-table-5_tf2lkw.png#thumbnail)

## console.time() & console.timeEnd()

This method starts a timer in the console that tracks how long an operation takes. You can give the timer an optional label parameter and may have up to 10,000 timers running on a given page.  
`console.timeEnd()` with the same label will stop the timer and display the result (in milliseconds) in the console.

```js {2}
// without a label
console.time();

setTimeout(() => {
  console.timeEnd();
}, 5000);
```

In this example, you should expect a timer end log after five seconds of runtime.

![without a label](https://res.cloudinary.com/josharrants/image/upload/v1608151949/josharrants.com/console-log/console-time-1_tcikwj.png#thumbnail)

You can also log the current time of the timer while it's running without stopping it by using `console.timeLog()`.

```js {2}
// with a label
console.time('Timer');

setTimeout(() => {
  console.timeEnd('Timer');
}, 5000);

setTimeout(() => {
  console.timeLog('Timer');
}, 2000);
```

Here, you should expect to see the `timeLog` first after two seconds, then the five second `timeEnd`.

![with a label](https://res.cloudinary.com/josharrants/image/upload/v1608152052/josharrants.com/console-log/console-time-2_veusuj.png#thumbnail)

## console.trace()

This method outputs a stack trace to the console. It's useful for showing you the call path taken to reach the point at which you call `console.trace()`.

```js {3}
function foo() {
  function bar() {
    console.trace();
  }
  bar();
}

foo();
```

![console.trace()](https://res.cloudinary.com/josharrants/image/upload/v1608153448/josharrants.com/console-log/console-trace_ptsoq7.png#thumbnail)

## console.warn()

This method logs a warning message to the console and displays as a warning in the browser console. It's very useful for testing code where you would want to indicate a non-breaking error.

```js {3}
let input = prompt('How many years of experience do you have?', '');
if (input == 0) {
  console.warn('It might be hard to get a job out of college.');
} else if (input > 0 && input <= 2) {
  console.warn('It will be a bit easier now!');
} else {
  console.log('Finding another job should be much easier now!');
}
```

![console.warn()](https://res.cloudinary.com/josharrants/image/upload/v1608154289/josharrants.com/console-log/console-warn_qfyj7j.png#thumbnail)

## Styling your console.log() outputs

In addition to the expendable list of methods available for the console object, we can also choose to specify some formatting magic that you can apply to the output of a `console.log()`. All of the following format specifiers start with a `%` followed by a corresponding letter.

| Syntax       | Description                                       |
| ------------ | ------------------------------------------------- |
| `%s`         | Element is converted to a string                  |
| `%d` or `%i` | Element is converted to an integer                |
| `%f`         | Element is converted to a float                   |
| `%o`         | Element is displayed as an expandable DOM element |
| `%O`         | Element is displayed as an expandable JS object   |
| `%c`         | Applies CSS style rules to the output string      |

In this example, I'm using the `%c` format specifier to style the output from a simple `console.log()`.

```js
// using %c format specifier
console.log('%c Big message', 'font-size: 36px; font-weight: bold;');
```

![using %c format specifier](https://res.cloudinary.com/josharrants/image/upload/v1608156752/josharrants.com/console-log/console-log-1_w06han.png#thumbnail)

That's it! Thank you for reading this post and I hope you learned something new! I encourage you to play around with these console object methods yourself. You find all documentation for the console object [here](https://developer.mozilla.org/en-US/docs/Web/API/Console). Please leave a comment down below if you any questions, or feel free to fill out my [contact form](/contact/) for inquiries or thoughts!