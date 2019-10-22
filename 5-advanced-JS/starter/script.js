/*
//Constructor Functions

//Weekly Menu constructor function
var Menu = function(breakfast, lunch, dinner, snacks) {
	this.breakfast = breakfast;
	this.lunch = lunch;
	this.dinner = dinner;
	this.snacks = snacks;
}

Menu.prototype.shoppingList = function(ingredients) {
	let list = ingredients.split(",");
	return list;
}

var mondayMenu = new Menu('omlette', 'chicken salad', 'Meat-za', 'nuts and chocolate chip cookie');

var tuesdayMenu = new Menu('fried eggs with spinach and bell peppers', 'Meat-za', 'Taco\'s', 'chocolate chip cookie and nori');

var wednesdayMenu = new Menu('baked egg in avocado half', ' Meat-za', 'Meat-Balls, rice and vegetables', 'nuts and nori');

var thursdayMenu = new Menu('avocado on gluten free toast', 'Meat-Balls and vegetables', 'Chicken Maryland, baked potato with avocado and salad', 'nuts and chocolate chip cookie');

var fridayMenu = new Menu('eggs with mushrooms', 'avocado on gluten free toast', 'Baked Fish with sweet potato mash and vegetables', 'nuts and nori');

console.log(mondayMenu.dinner);
console.log(wednesdayMenu.breakfast);
console.log(fridayMenu);

console.log(tuesdayMenu.shoppingList('eggs, spinach, bell peppers, shrimp, chicken, onion, nori' ))

//***could create an object of certain foods or recipes used often with the 
//ingredients broken down already in an array which would then be able to be added to
//shoppingList method.***

//***could also design a method to randomly select a menu item from an array of favourites
//and assign it to a meal time spot.***

console.info(thursdayMenu);
console.info();


//Object.create >>> allows you to specify which object is the prototype to inherit

var personProto = {
	calculateAge: function() {
		console.log(2019 - this.yearOfBirth);
	}
}

var john = Object.create(personProto);
john.name = "John";
john.yearOfBirth = 1990;
john.job = 'teacher';

//OR

var jane = Object.create(personProto, 
{
	name: {value: 'Jane'},
	yearOfBirth: {value: 1969},
	job: {value: 'designer'}
});



//Primitives vs Objects


//Primitives
var a = 23;
var b = a;
a = 46;

console.log(a); //46
console.log(b); // 23

//Objects
var obj1 = {
	name: 'John',
	age: 26
}

var obj2 = obj1; // creates a reference that points to same object, changes happen to both
obj1.age = 38;
console.log(obj1.age); //30
console.log(obj2.age); //30

//Functions
var age = 27;
var obj = {
	name: 'Jonas',
	city: 'Lisbon'
};

function change(a, b) {
	a = 30;
	b.city = 'San Francisco';
}

change(age, obj);

console.log(age); //27 >> doesn't change primitive value
console.log(obj.city); //San Francisco  >> changes reference


//Passing Functions as arguments >> callback functions

var years = [1990, 1965, 1937, 2005, 1984];

function arrayCalc(arr, fn) {
	var arrRes = [];
	for (var i = 0; i < arr.length; i++) {
		arrRes.push(fn(arr[i]));
	}
	return arrRes;
}

function calculateAge(el) {
	return 2016 - el;
}

function isFullAge(el) {
	return el >= 18;
}

function maxHeartRate(el) {
	if (el >=18 && el <= 81) {
	return Math.round(206.9 - (0.67 * el));
	} else {
		return -1;
	}
}	


var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(rates); //new array of ages

//functions returning functions

function interviewQuestion(job) {
	if (job === 'designer'){
		return function(name) {
			console.log(name +', can you please explain what UX design is?');
		}
	}else if (job ==='teacher') {
		return function(name) {
			console.log('What subject do you teach, ' + name + '?');
		}
	} else {
		return function(name) {
			console.log('Hello ' + ', what do you do?');
		}
	}
}

var teacherQuestion = interviewQuestion('teacher'); //stores the returned function into a variable

teacherQuestion('Kate');  //What subject do you teach, Kate?

//OR

interviewQuestion('teacher')('Kate'); ///What subject do you teach, Kate?



// IIFE - Immediately invoked function expression
// keeps core hidden - ie data privacy

function game() {
	var score = Math.round() * 10;
	console.log(score >= 5);
}
game(); // true or false

//above as an IIFE
// only called once
(function () {
	var score = Math.round() * 10;
	console.log(score >= 5);
})(); //envoked 



//Closures

function interviewQuestion(job) {
	var a = ', can you please explain what UX design is?';
	var b = 'What subject do you teach, ';
	var c = ', what do you do?';
	if (job === 'designer'){
		return function(name) {
			console.log(name + a);
		}
	}else if (job ==='teacher') {
		return function(name) {
			console.log( b + name + '?');
		}
	} else {
		return function(name) {
			console.log('Hello ' + name + c);
		}
	}
}

interviewQuestion('teacher')('Jill');
interviewQuestion('designer')('Jack');
interviewQuestion('developer')('Kate');

//OR better still 

function interviewQuestion(job) {
	return function(name) {
		if (job === 'designer'){
			console.log(name +', can you please explain what UX design is?');
		} else if (job ==='teacher') {
			console.log('What subject do you teach, ' + name + '?');
		} else {
			console.log('Hello ' + name + ', what do you do?');
		}
	}}



interviewQuestion('teacher')('Jill');
interviewQuestion('designer')('Jack');
interviewQuestion('developer')('Kate'); */

//////////////////////////////////////////////
//Bind, Call and Apply - methonds
//all allow to set the 'this' keyword


//Call - allows us to use or borrow a method from another object, it assigns
//the this keywrod to the specified object.

//Bind method returns a function
// allows you to save a copy of a  function with a preset argument


//Coding Challenge 7

/////////Pre-Planning//////////
//constructor function for questions 
//question objects >> Q, lis of A, correct A
//array of question objects

//function creating random number * length of array
//>>>access random index, console.log question + list of answers
//>>>prompt question
//>>>listen for input
//>>>use if else statement to compare result
//>>>console.log message for right or wrong use as call back function?

//use an IIFE

(function () {
	function Question(question, answerListArr, answer) {
	this.question = question;
	this.answerList = answerListArr;
	this.answer = answer;
}

	alert("type 'exit' to quit game");
	let questionOne = new Question('What is the capital of Australia?', ['Sydney', 'Canberra', 'Brisbane', 'Melbourne'], 1);
	let questionTwo = new Question('What is the drinking age in Australia?', [17, 18, 20, 21], 1);
	let questionThree = new Question('How many countries are there in the world?', [187, 190, 193, 195], 3);
	let questionFour = new Question('Is Wellington the capital of New Zealand?', [true, false], 0);
	let questionFive = new Question('How many States in the United States of America?', ['49 plus the District of Columbia', '50 plus the District of Columbia', '51 plus the District of Columbia', '52 plus the District of Columbia'], 1);
	let questionSix = new Question('How much does Kate want to visit Morocco?', ['A little', 'Not at all', 'A LOT!!'], 2);

	let questionArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix];
	let score = 0;

	function randomQuestion() {
	 	let num = Math.floor(Math.random() * questionArr.length);
		console.log(questionArr[num].question) 
		for (var i = 0; i <= questionArr[num].answerList.length - 1; i++) {
			console.log(`${i}: ${questionArr[num].answerList[i]}`);
		}
			function fnMessage() {
				let answerInput = prompt(questionArr[num].question, "type number of answer here");
				if (answerInput == 'exit') {
					return
				} else if (answerInput == questionArr[num].answer) {
				console.log("That is correct!!")
				score += 1;
				console.log(`You're total score is now ${score}!!

					 `);
				} else {
				console.log(`Incorrect, the answer was ${questionArr[num].answer}`)
				console.log(`You're total score is still ${score}

					`);

				}
				nextQuestion();
			};
			fnMessage();

		function nextQuestion() {
		randomQuestion();
		}
	
	}
randomQuestion();
})();

// could have used prototype to make the display question and display answers
//as methods on the Question prototype.























