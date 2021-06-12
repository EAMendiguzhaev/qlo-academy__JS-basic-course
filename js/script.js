'use strict';
const buttonStart = document.getElementById('start');
const buttonCansel = document.getElementById('cancel');
const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const expensesTitle = document.querySelector('.expenses-items .expenses-title');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items');
const expensesItemTemplete = expensesItems[0].cloneNode(true);
let incomeItems = document.querySelectorAll('.income-items');
const incomeItemTemplete = incomeItems[0].cloneNode(true);

const сalcInputs = document.querySelectorAll('input[type=text]');
const dataColumn = document.querySelector('.data');
const inputTypeText = dataColumn.querySelectorAll('input[type=text]');
const resultColumn = document.querySelector('.result');
const inputTextResult = resultColumn.querySelectorAll('input[type=text]');

//Функция проверяет является цифрой
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Функция проверяет является буквой или нет
const isStr = function (str) {
  let reg = /^[а-яА-Я ,]+$/;
  return reg.test(str);
};

//Функция делает первую букву заглавной
const ucFirst = function (str) {
  if (str === '') {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

//Валидации полей
const validateFunction = function () {
  let inputName = document.querySelectorAll('input[placeholder = "Наименование"]');

  inputName.forEach((item) => {
    item.addEventListener('input', function (event) {
      if (event.target.value !== '' && !isStr(event.target.value)) {
        alert('В данном поле допустимы только буквы русского алфавита!');
        event.target.value = event.target.value.replace(/[^а-яА-Я ,]+$/g, '');
      }
    });
  });

  let inputAmount = document.querySelectorAll('input[placeholder = "Сумма"]');
  inputAmount.forEach((item) => {
    item.addEventListener('input', function (event) {
      if (event.target.value !== '' && !isNumber(event.target.value)) {
        alert('В данном поле допустимы только цифры!');
        event.target.value = event.target.value.replace(/[^\d]+$/g, '');
      }
    });
  });
};

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.incomeMonth = 0;
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
  // if (salaryAmount.value !== '') {
  //   start.setAttribute('disabled', true);
  //   return;
  // }

  this.budget = salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();
  // consolePrint();
};

AppData.prototype.showResult = function () {
  let _this = this;

  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();

  // periodSelect.addEventListener('input', function (event) {
  //   incomePeriodValue.value = event.target.value * _this.budget;
  // });
};

AppData.prototype.getExpenses = function () {
  let _this = this;
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.getAddExpenses = function () {
  let _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  this.expensesMonth = 0;
  for (let key in this.expenses) {
    this.expensesMonth += parseInt(this.expenses[key]);
  }
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItemTemplete.cloneNode(true);
  buttonExpensesAdd.before(cloneExpensesItem);
  validateFunction();
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    buttonExpensesAdd.style.display = 'none';
  }
};

AppData.prototype.getIncome = function () {
  let _this = this;
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in this.income) {
    _this.incomeMonth += +_this.income[key];
  }
};

AppData.prototype.getAddIncome = function () {
  let _this = this;
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.udgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay < 0) {
    console.log('Что то пошло не так');
  }
};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItemTemplete.cloneNode(true);
  buttonIncomeAdd.before(cloneIncomeItem);
  validateFunction();
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    buttonIncomeAdd.style.display = 'none';
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = parseInt(this.budget) + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getInfoDeposit = function () {
  this.deposit = confirm('Есть ли у вас депозит в банке?');
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
    } while (!isNumber(this.percentDeposit));
    console.log(`Проценты в банке: ${this.percentDeposit}%`);

    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
    } while (!isNumber(this.moneyDeposit));
    console.log(`Сумма депозита: ${this.moneyDeposit}`);
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventsListeners = function () {
  const _this = this;

  // Кнопка Рассчитать
  buttonStart.addEventListener('click', function (event) {
    if (salaryAmount.value !== '') {
      _this.start();
    } else {
      event.preventDefault();
      return alert('Поле "Месячный доход" не должно быть пустым!');
    }

    inputTypeText.forEach((element) => {
      element.setAttribute('readonly', true);
    });

    buttonStart.style.display = 'none';
    buttonCansel.style.display = 'block';
    periodSelect.disabled = true;
  });

  buttonExpensesAdd.addEventListener('click', function () {
    _this.addExpensesBlock();
  });

  buttonIncomeAdd.addEventListener('click', function () {
    _this.addIncomeBlock();
  });

  periodSelect.addEventListener('input', function (event) {
    periodAmount.textContent = event.target.value;
  });

  // Кнопка Сбросить
  buttonCansel.addEventListener('click', function (event) {
    сalcInputs.forEach((element) => {
      element.value = '';
    });

    incomeItems.forEach((element, i) => {
      if (i !== 0) {
        element.remove();
      }
    });

    expensesItems.forEach((element, i) => {
      if (i !== 0) {
        element.remove();
      }
    });

    depositCheck.checked = false;
    buttonStart.style.display = 'block';
    buttonCansel.style.display = 'none';
    periodSelect.disabled = false;

    inputTypeText.forEach((element) => {
      element.removeAttribute('readonly');
    });
  });
};

const appData = new AppData();

appData.eventsListeners();
validateFunction();
