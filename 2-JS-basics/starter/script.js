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

//Coding Challenge 5

/* TAKE ONE

let tipCalc = {
johnBills: [124, 48, 268, 180, 42],
markBills: [77, 375, 110, 45],
johnCalc: function() {
	for (var i = 0; i < this.johnBills.length; i++) {
		if (this.johnBills[i] > 200) {
			this.johnTips.push(this.johnBills[i] * .1);
			this.johnBillWithTips.push(this.johnBills[i] * 1.1);
		} else if (this.johnBills[i] >= 50 && this.johnBills[i] <= 200) {
			this.johnTips.push(this.johnBills[i] * .15);
			this.johnBillWithTips.push(this.johnBills[i] * 1.15);
		} else {
			this.johnTips.push(this.johnBills[i] * .2);
			this.johnBillWithTips.push(this.johnBills[i] * 1.2);
		}
	}
},
markCalc: function() {
	for (var i = 0; i < this.markBills.length; i++) {
		if (this.markBills[i] < 100) {
			this.markTips.push(this.markBills[i] * .2)
			this.markBillWithTips.push(this.markBills[i] * 1.2)
		} else if (this.markBills[i] >= 100 && this.markBills[i] <=300) {
			this.markTips.push(this.markBills[i] * .1)
			this.markBillWithTips.push(this.markBills[i] * 1.1)
		} else {
			this.markTips.push(this.markBills[i] * .25)
			this.markBillWithTips.push(this.markBills[i] * 1.25)
		}
	}
},
johnTips: [],
johnBillWithTips: [],
markTips: [],
markBillWithTips: []
}

console.log(tipCalc.johnCalc(), tipCalc.markCalc(), tipCalc);
*/
//TAKE TWO

var john = {
	fullName: 'John Smith',
	bills: [124, 48, 268, 180, 42],
	calcTips: function() {
		this.tips = [];
		this.finalBill = []

	for (var i = 0; i < this.bills.length; i++) {

		var percentage;
		var bill = this.bills[i];

		if (bill > 200) {
			percentage = .1;
		} else if (bill >= 100 && bill <= 200) {
			percentage = .15;
		} else {
			percentage = .2;
			
		}
		this.tips[i] = bill * percentage;
		this.finalBill = bill + bill * percentage;
	} 
},
}

var mark = {
	fullName: 'Mark Jones',
	bills: [77, 375, 110, 45],
	calcTips: function() {
		this.tips = [];
		this.finalBill = []

	for (var i = 0; i < this.bills.length; i++) {

		var percentage;
		var bill = this.bills[i];

		if (bill > 300) {
			percentage = .25;
		} else if (bill >= 50 && bill <= 300) {
			percentage = .1;
		} else {
			percentage = .2;
			
		}
		this.tips[i] = bill * percentage;
		this.finalBill = bill + bill * percentage;
	} 
},
}



function average(tips) {
	var sum = 0;
	for (var i = 0; i < tips.length; i++) {
		sum += tips[i];
	}
	var averageTips = sum / (tips.length);
	return (averageTips);
}
mark.calcTips();
john.calcTips();
john.average = average(john.tips);
mark.average = average(mark.tips);
console.log(john);
console.log(mark);

if (john.average > mark.average) {
	console.log(`John tips more the Mark, with an average of ${john.average}`)
} else if (mark.average > john.average) {
		console.log(`Mark tips more the John, with an average of ${mark.average}`)
} else {
	console.log(`Mark and John tip the same on Average`)
};















