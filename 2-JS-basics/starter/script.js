var teamJohn = [89, 120, 103]; 
var teamMark = [116, 97, 123];
var teamMary = [97, 134, 105]; 

function average(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++) {
		total += arr[i];
	};
	var avg = total / arr.length;
	return avg;
} 

var avgJohn = average(teamJohn);
var avgMark = average(teamMark);
var avgMary = average(teamMary); 
console.log(avgJohn);
console.log(avgMark);
console.log(avgMary);


if (avgJohn > avgMark && avgJohn > avgMary) {
	console.log('John\'s team is the winner with an average score of ' + avgJohn +'!');
} else if (avgMark > avgJohn && avgMark > avgMary) {
	console.log('Mark\'s team is the winner with an average score of ' + avgMark +'!');
} else  if (avgMary > avgJohn && avgMary > avgMark) {
	console.log('Mary\'s team is the winner with an average score of ' + avgMary +'!');
} else if (avgMark === avgJohn || avgMary === avgJohn || avgMary === avgMark) {
	console.log('There is a draw!!!') }


var totalWithTip = [];
var tipArray = [];

 var tipAmount = function(bill) {
 	var tip = 0;
 	if (bill > 200) {
 		tip = bill * 0.1;
 	} else if (bill < 200 && bill >= 50) {
 		tip = bill * 0.15; 
 	} else {
 		tip = bill * 0.2;
 	}
 	tipArray.push(tip);
 	totalWithTip.push(tip + bill);
 }

 var bill1 = tipAmount(124);
 var bill2 = tipAmount(48);
 var bill3 = tipAmount(268);

 
console.log(tipArray, totalWithTip);


//Coding challenge 4

var mark = {
	fullName: 'Mark Jones',
	mass: 102,
	height: 1.9,
	calcBmi: function() {
		this.bmi = this.mass / (this.height * this.height);
		return this.bmi;
	}
}


var john = {
	fullName: 'John Smith',
	mass: 95,
	height: 1.8,
	calcBmi: function() {
		this.bmi= this.mass / (this.height * this.height);
		return this.bmi;
	}
}


if (john.calcBmi() > mark.calcBmi()) {
	console.log(`${john.fullName} has the highest BMI of ${john.bmi}`);
} else if (mark.bmi > john.bmi) {
	console.log(`${mark.fullName} has the highest BMI of ${mark.bmi}`);
} else {
	console.log('There is a tie!!')
}


// loops

// continue and break statements 
var john = ['john', 'Smith', 1990, 'designer', false, 'blue'];

for (var i = 0; i < john.length; i++) {
	if (typeof john[i] !== 'string') continue;
	console.log(john[i]);
}

for (var i = 0; i < john.length; i++) {
	if (typeof john[i] !== 'string') break;
	console.log(john[i]);
}

//reverse challenge
for ( var i = john.length - 1; i >= 0; i--) {
	console.log(john[i]);
}






















