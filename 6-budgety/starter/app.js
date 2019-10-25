// BUDGET CONTROLLER
let budgetController = (function(){

	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome) {

		if ( totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	};

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let calculateTotal = function(type) {
		let sum = 0;
		data.allItems[type].forEach(item => {
			sum += item.value;
		});
		data.totals[type] = sum;
	};

	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};
	return {
		addItem: function(type, des, val) {
			var newItem, ID;

			// Create New ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length -1].id + 1;
			} else { 
				ID = 0;
			}

			// Create new item object based on 'inc' or 'exp'x`` type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}	

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the  new element
			return newItem;

		},

		deleteItem: function (type, id) {
			 
			 let ids = data.allItems[type].map(item => {
			 	return item.id;
			 	});
			 let index = ids.indexOf(id);

			 if (index !== -1 ) {
			 	data.allItems[type].splice(index, 1);
			 }
		},

		calculateBudget: function() {

			// 1. calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			// 2.Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			// 3.Calculate the percentage of income we spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		calculatePercentage: function() {

			data.allItems.exp.forEach(current => {
				current.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: function() {
			let allPerc = data.allItems.exp.map(current => {
				return current.getPercentage();
			});
			return allPerc;
		},
			
		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: function() {
			console.log(data);
		}
	};

})();


// UI CONTROLLER
let UIController = (function() {

	let DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetValue: '.budget__value',
		budgetInc: '.budget__income--value',
		budgetExp: '.budget__expenses--value',
		budgetExpPercentage: '.budget__expenses--percentage',
		container: '.container',
		expItemPercentages: '.item__percentage',
		dateLabel: '.budget__title--month'
	}

	let formatNumber = function(num, type) {
			let numSplit, int, dec;

			num = Math.abs(num); //abs is absolute removes sigh of number
			num = num.toFixed(2);

			numSplit = num.split('.'); //results stored in an array

			int = numSplit[0];
			if (int.length > 3 && int.length < 7) {
				int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
			} else if (int.length > 6) {
				int = int.substr(0, int.length - 6) + ',' + int.substr(int.length - 6, 3) + ',' + int.substr(int.length - 3, 3);
			}

			dec = numSplit[1]; 

			return (type === 'exp' ? '-' : '+') + ` ${int}.${dec}`;

		};

		let nodeListForEach = function(list, callback) {
				for (var i = 0; i < list.length; i++) {
					callback(list[i], i);
				}
			};

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //parseFloat converts strong to number
			};
		},

		addListItem: function(obj, type) {
			let html, newHtml, element;
			let formatValue = formatNumber(obj.value, type);

			// 1. Create HTML String with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = `<div class="item clearfix" id="inc-${obj.id}">
	                <div class="item__description">${obj.description}</div>
	                    <div class="right clearfix">
	                        <div class="item__value">${formatValue}</div>
	                        <div class="item__delete">
	                        	<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
	                   		</div>
	                	</div>
	            </div>`
	        } else if (type === 'exp') {
	        	element = DOMstrings.expensesContainer;
	        	  html = `<div class="item clearfix" id="exp-${obj.id}">
	                <div class="item__description">${obj.description}</div>
	                    <div class="right clearfix">
	                        <div class="item__value">${formatValue}</div>
	                        <div class="item__percentage">21%</div>
	                        <div class="item__delete">
	          	                 <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
	                        </div>
	                    </div>
	            </div>`
	        }
			// 2. Replay the placeholder text with actual data >>> pre es6 WAY
			//newHtml = html.replace('%id%', obj.id);
			//newHtml = newHtml.replace('%description%', obj.description);
			//newHTML = newHtml.replace('%value%', formatNumber(obj.value, type); 

			// 3. Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', html);

		},

		deleteListItem: function(selectorID) {

			let el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function() {
			var fields, fieldsArr;

			fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

			fieldsArr = Array.prototype.slice.call(fields); //makes array from Node List

			fieldsArr.forEach((element, index, array) => {
				element.value = ""; //clears value to nothing
			});
			fieldsArr[0].focus(); //puts focus back on description input
		},

		displayBudget: function (object) {
			let type;
			let formatBudget = formatNumber(object.budget, type);

			object.budget > 0 ? type = 'inc' : type = 'exp';

			if (object.budget === 0) {
				document.querySelector(DOMstrings.budgetValue).textContent = `0.00`;
			} else {
				document.querySelector(DOMstrings.budgetValue).textContent = `${formatBudget}`;	
			}
						
			document.querySelector(DOMstrings.budgetInc).textContent = formatNumber(object.totalInc, 'inc');
			document.querySelector(DOMstrings.budgetExp).textContent = formatNumber(object.totalExp, 'exp');
		
			if (object.percentage > 0) {
				document.querySelector(DOMstrings.budgetExpPercentage).textContent = `${object.percentage} %`;	
			} else 	{
				document.querySelector(DOMstrings.budgetExpPercentage).textContent = `---`;
			};
		},

		displayPercentages: function(percentages) { //input is an array of percentages

			let fields = document.querySelectorAll(DOMstrings.expItemPercentages);

			nodeListForEach(fields, function(current, index) {

				if (percentages[index] > 0) {
					current.textContent = percentages[index] + `%`;
				} else {
					current.textContent = '---';
				}

			});
		},

		displayMonth: function() {
			let now, month, months, year, date;

			now  = new Date();
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			month = now.getMonth();
			year = now.getFullYear();

			document.querySelector(DOMstrings.dateLabel).textContent = `${months[month]}, ${year}`;
		},

		changedType: function() {

			var fields = document.querySelectorAll(`${DOMstrings.inputType}, ${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

			nodeListForEach(fields, function(element) {
				element.classList.toggle('red-focus');
			});
			document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
		},

		getDOMstrings: function() {
			return DOMstrings;
		}
	}; 

})(); 


// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {

	let setupEventListeners = function() {

		let DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || event.which === 13) { //for older browers
				ctrlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
	};

	let updateBudget = function() {

		// 1. calculate the budget
		budgetCtrl.calculateBudget();
		// 2. return the budget
		let budget = budgetCtrl.getBudget();
		// 3. display the budget on the UI 
		UICtrl.displayBudget(budget);
	};

	let updatePercentages = function () {

		// 1, calculate percentages
		budgetController.calculatePercentage();

		// 2. Read percentages from budget controller
		let percentages = budgetController.getPercentages();

		// 3. Update UI with new percentages
		UICtrl.displayPercentages(percentages);

	};

	let ctrlAddItem = function() { // when user hits enter or button
		let input, newItem;

		// 1. get input data
		input = UICtrl.getInput();
		
		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

			// 2. add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			// 3. Add item to UI
			UICtrl.addListItem(newItem, input.type);

			//4. clear the fields
			UICtrl.clearFields();

			// 5. Calculate and update budget
			updateBudget();

			// 6. Update percentages
			updatePercentages();

		};
	};

	let ctrlDeleteItem =function(event) { 
	//target where event is fired
		let itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; 
		//console.log(itemID);

		if (itemID) {

			splitID = itemID.split('-'); // returns array
			type = splitID[0];
			ID = parseInt(splitID[1]); //convets to interger, no decimals.

			// 1. delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);
			// 2. delete the item from the UI
			UIController.deleteListItem(itemID);
			//3. update and show new budget
			updateBudget();

			// 4. Update percentages
			updatePercentages();
		}
	}

		return {
			init: function() {
				console.log("applicaion has started");
				UICtrl.displayMonth();
				UICtrl.displayBudget({
					budget: 0,
					totalInc: 0,
					totalExp: 0,
					percentage: -1
				});
				setupEventListeners();
			}
		};
	

})(budgetController, UIController);


controller.init();