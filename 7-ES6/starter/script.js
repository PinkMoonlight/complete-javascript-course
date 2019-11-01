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

//////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////
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
//good for hash maps
/*
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

*/
///////////////////////////////////////////////////////////////
//Classes 

//ES5
/*
var Person5 = function(name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
} 	

Person5.prototype.calculateAge = function() {
	var age = new Date().getFullYear - yearOfBirth;
	console.log(age);
}

var john = new Person5('John', 1990, 'teacher');

//ES6 

class Person6 {
	constructor (name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	}

	calculateAge() {
		var age = new Date().getFullYear - yearOfBirth;
		console.log(age);
	}

	static greeting() {
		console.log('Hey there!')
	}
}

const john6 = new Person6('John', 1990, 'teacher');

//Static methods attached to class, but not inherrited by class instances
Person6.greeting(); //not that useful
*/
///////////////////////////////////////////////////////////////////
//Classes and Subclasses


//ES5
var Person5 = function(name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
} 	

Person5.prototype.calculateAge = function() {
	var age = new Date().getFullYear() - this.yearOfBirth;
	console.log(age);
}

//subclass ES5

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
	Person5.call(this, name, yearOfBirth, job);
	this.olympicGames = olympicGames;
	this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype); //connects Athelete  protptype to Person prototype

Athlete5.prototype.wonMedal = function() {
	this.medals++;
	console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();


//ES6 
class Person6 {
	constructor (name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	}

	calculateAge() { //prototype function
		var age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	}



}

class Athlete6 extends Person6 {
	constructor(name, yearOfBirth, job, olympicGames, medals) {
		super(name, yearOfBirth, job);
		this.olympicGames = olympicGames;
		this.medals = medals;
	}
	
	wonMedal6() {
		this.medals++;
		console.log(this.medals);
	}
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal6();
johnAthlete6.calculateAge();

/////////////////////////////////////////////////////////////////
console.log("Start of Coding Challenge here!!!!!!!!!!!!!!!!!!!");
//Coding Challenge ES6

//.1 Parks and streets sub classes of town class with name and build year properties

//2.park sub class needs property of number or trees, park size/area, method for age

//3. street sub class needs length of street property, size classification method


class SmallTown {
	constructor(name, buildYear) {
		this.name = name;
		this.buildYear = buildYear;
	}
};

class Park extends SmallTown {
	constructor(name, buildYear, numberOfTrees, parkArea) {
		super(name, buildYear);
		this.numberOfTrees = numberOfTrees;
		this.parkArea = parkArea;
		this.age;
	}

	treeDensity() {
		let density = this.numberOfTrees / this.parkArea;
		return `${this.name} has a tree density of ${density} trees per square km.`;
	}

	parkAge(buildYear) {
		let age = new Date().getFullYear() - buildYear;
		this.age = age;
		return age;
	}
}

class Street extends SmallTown {
	constructor(name, buildYear, length, size = 'normal') {
		super(name, buildYear);
		this.streetLength = length;
		this.size = size;
	}	

};

//Create object instances
goldenGatePark = new Park('Golden Gate Park', 1921, 1001, 1500);
oakwoodPark = new Park('Oakwood Park', 2000, 50, 500);
magpieHillPark = new Park('Magpie Hill Park', 1915, 102, 1000);

magpieLane = new Street('Magpie Lane', 2010, 1, 'tiny');
oakStreet = new Street('Oak Street', 2018, 5);
goldenGateStreet = new Street('Golden Gate Street', 2014, 11, 'big');
mainStreet = new Street('Main Street', 2014, 4);


let smallTownData = {
	parks: [],
	streets: []
};

//push streets data array
function streetsData(...street) {
	street.map(el => smallTownData.streets.push(el));
}; 

streetsData(magpieLane, oakStreet, goldenGateStreet, mainStreet);

//calculate parkAvg
function calculateParkAvg(...park) { //inputs  an array
	let ages = [];
	park.map(el => {
		ages.push(el.parkAge(el.buildYear));
		smallTownData.parks.push(el);
	});
	let avg = 0;
	ages.forEach(age => avg += age);
	avg = avg / ages.length; 
	return avg;
}

let parkAverageAge = calculateParkAvg(goldenGatePark, oakwoodPark, magpieHillPark);

//find most number of trees
function mostTrees(arr) {
	let index = arr.findIndex(el => el.numberOfTrees);

	return arr[index].name;
};

// find street length and average
function totalStreetLength(streets) {
		let sum = 0;
		streets.forEach(el => sum += el.streetLength);
		
		let avg =  sum / streets.length;
		return {
			sum: sum,
			avg: avg,
			streetsNum: streets.length
		}
	}

let over1000Trees = mostTrees(smallTownData.parks);
let streetTotals = totalStreetLength(smallTownData.streets);

//report

const townReport = new Map();

townReport.set('Report1', '----------Park Report----------');
townReport.set('item1', `Our ${smallTownData.parks.length} parks have an average age of ${parkAverageAge} years.`);
townReport.set('item2', `${goldenGatePark.treeDensity()}`);
townReport.set('item3', `${oakwoodPark.treeDensity()}`);
townReport.set('item4', `${magpieHillPark.treeDensity()}`);
townReport.set('item5', `${over1000Trees} has over 1000 trees`); 

townReport.set('Report2', '----------Street Report----------');
townReport.set('item6', `Our ${streetTotals.streetsNum} streets have a total length of ${streetTotals.sum} km and an average length of ${streetTotals.avg} km`);
townReport.set('item7', `${magpieLane.name}, built in ${magpieLane.buildYear}, is a ${magpieLane.size} street.`);
townReport.set('item8', `${oakStreet.name}, built in ${oakStreet.buildYear}, is a ${oakStreet.size} street.`);
townReport.set('item9', `${goldenGateStreet.name}, built in ${goldenGateStreet.buildYear}, is a ${goldenGateStreet.size} street.`);
townReport.set('item10', `${mainStreet.name}, built in ${mainStreet.buildYear}, is a ${mainStreet.size} street.`);


console.log(townReport.get('Report1'));
console.log(townReport.get('item1'));	
console.log(townReport.get('item2'));	
console.log(townReport.get('item3'));	
console.log(townReport.get('item4'));	
console.log(townReport.get('item5'));
console.log(townReport.get('Report2'));
console.log(townReport.get('item6'));
console.log(townReport.get('item7'));
console.log(townReport.get('item8'));
console.log(townReport.get('item8'));
console.log(townReport.get('item9'));
console.log(townReport.get('item10'));






////////////////////////
//reduce method for array's

//array.reduce((prev, cur, index) => prev + current, 0); // 0 is index where stars counting 


















