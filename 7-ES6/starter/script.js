// let and const ES6

//ES5 - function scoped
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);


//ES6 - block scoped
let name6 = 'Jane Smith';
let age6 = 23;
name6 = "Jane Miller"; // error, const is immutable variable

//Blocks and IIFE's

//a block
{
	const a = 1;
	let b = 2;

}

//console.log(a + b); //error 
//data not accessible from the outside, data privacy like an IIFE



//New string methods in ES6
/*
const n = `${fistName} ${lastName}`;
console.log(n.startsWith('J')); //true
console.log(n.endsWith('Sm')); // false
console.log(n.includes(' ')); //true
console.log(name6.repeat(5)); //repeats varible inserted number of times
*/


//Arrow functions and 'this' keyword >> inherits the 'this' from lexical environment 

function Person(name) {
	this.name = name;
};

Person.prototype.myfriends6 = function(friends) {
	let arr = friends.map(el => `${this.name} is friends with ${el}`);
	console.log(arr);
};

let friends = ['Heather', 'Lauren', 'Mandy', 'Jayne', 'Brooke', 'Karen', 'Margie'];

new Person('Kate').myfriends6(friends);

//Destructuring

//for arrays
const [name, age] = ['Kate', 35];
 
 //for objects
 let favs = {
 	favMovie: 'Good Will Hunting',
 	favTvShow: 'Big Bang Theory'
 };

 let {favMovie, favTvShow} = favs;
 console.log(favMovie); // Good Will Hunting
 //OR
 let {favMovie: a, favTvShow: b} = favs;
console.log(b); // Big Bang Theory

 //Arrays ES6

 const boxes = document.querySelectorAll('.box');

 //ES5 
 
 var boxesArr5 = Array.prototype.slice.call(boxes); //nodeList to an Array
 boxesArr5.forEach(function(current) {
 	current.style.backgroundColor = 'dodgerblue';
 });  
 //ES6
const boxesArr6 = Array.from(boxes);
//OR
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// ES5
/*
for (var i = 0; i < boxesArr5.length; i++) {
	if (boxesArr5[i].className === 'box blue') {
		continue;
	} 

	boxesArr5[i].textContent = 'I changed to blue';
};
*/
//ES6 version of above using 'for of loop'

 for (const i of boxesArr6) {
 	if (i.className.includes('blue')) {
		continue;
	}
	i.textContent = `I changed to blue!`;
 }

//new Array methods 

//ES5

var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(current){
	return current >= 18;
});
console.log(full); // false, false, false, true false, false
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6 new method

console.log(ages.findIndex(el => el >= 18)); // 3 (index)
console.log(ages.find(el => el >= 18)); // 21 (Value)


// Spread Operator

function addFourAges(a, b, c, d) {
	return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1); //81

// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2); // 81

//ES6
const sum3 = addFourAges(...ages); //spread operator
console.log(sum3); //81

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];

const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily); //one array with all of the family name elements


const h = document.querySelector('h1'); //returns node
const boxes2 = document.querySelectorAll('.box'); //returns nodeList
const all = [h, ...boxes2];  //Array
console.log(all); //[h1, div.box.green, div.box.blue, div.box.orange]

Array.from(all).forEach(el => el.style.color = 'purple');
/*
/////////////////////////////////////////////////
//Rest Parameters >> transforms aruments into an array

//ES5
function isFullAge5() {
	//console.log(arguments);
	var argsArr = Array.prototype.slice.call(arguments);

	argsArr.forEach(function(element) {
		console.log((2016 - element) >= 18);
	})
}

//isFullAge5(1990, 1999, 1965);

//ES6

function isFullAge(...years) { //creates an array out of the argumets passes into it
	years.forEach( el => console.log((2016 - el) >= 18));

}
isFullAge6(1990, 1999, 1965);
*/

//ES5
function isFullAge5() {
	//console.log(arguments);
	var argsArr = Array.prototype.slice.call(arguments);

	argsArr.forEach(function(element) {
		console.log((2016 - element) >= 18);
	})
}

//isFullAge5(1990, 1999, 1965);

//ES6

function isFullAge6(...years) { //creates an array out of the argumets passes into it
	years.forEach( el => console.log((2016 - el) >= 18));

}
isFullAge6(1990, 1999, 1965);


//////////////////////////////////////////////
//Default Parameters

//ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
	
	lastName === undefined ? lastName = "Smith" : lastName = lastName;
	nationality === undefined ? nationality = "American" : nationality = nationality;

	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);


//ES6

function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality;
}

var mark = new SmithPerson('Mark', 1985);


///////////////////////////////////////////////////////////
//Maps in ES6 - new key value data structure

const question = new Map();

question.set('question', 'What is the offical name of the lastest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct Answer!');
question.set(false, 'Wrong, please try again');

console.log(question.get('question'));
//console.log(question.size);

if(question.has(4)) {
	//question.delete(4);
	//console.log('Answer 4 is here');
}
//question.clear(); //deletes all data from map

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

//example for using 'for of loop' on Map and destructuring
for (let [key, value] of question.entries()) {
	if (typeof(key) === 'number') {
		console.log(`Answer ${key}: ${value}`);
	}
}

const ans = parseInt(prompt('Write the number of the correct Answer'));

 console.log(question.get(ans === question.get('correct'))); 

 	


















