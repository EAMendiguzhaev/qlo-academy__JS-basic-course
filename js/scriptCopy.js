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

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  incomeMonth: 0,
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    this.budget = salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    // consolePrint();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', function (event) {
      incomePeriodValue.value = event.target.value * appData.budget;
    });
  },
  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItemTemplete.cloneNode(true);
    buttonExpensesAdd.before(cloneExpensesItem);
    validateFunction();
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      buttonExpensesAdd.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItemTemplete.cloneNode(true);
    buttonIncomeAdd.before(cloneIncomeItem);
    validateFunction();
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      buttonIncomeAdd.style.display = 'none';
    }
  },
  getExpensesMonth: function () {
    this.expensesMonth = 0;
    for (let key in this.expenses) {
      this.expensesMonth += parseInt(this.expenses[key]);
    }
  },
  getBudget: function () {
    this.budgetMonth = parseInt(this.budget) + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },

  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.udgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      console.log('Что то пошло не так');
    }
  },
  getInfoDeposit: function () {
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
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
};

//Функция вывода на консоль
const consolePrint = function () {
  console.log('Наша программа включает в себя данные: ');
  for (let key in this) {
    console.log('Ключ: ' + key + ' значение: ' + this[key]);
  }

  console.log('Месячный доход: ' + this.budget);

  console.log('Дополнительный доход: ');
  for (let key in this.income) {
    console.log('Ключ: ' + key + ' значение: ' + this.income[key]);
  }

  console.log('Обязательные расходы: ');
  for (let key in this.expenses) {
    console.log('Ключ: ' + key + ' значение: ' + this.expenses[key]);
  }

  console.log(Math.ceil(this.getTargetMonth()));
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

validateFunction();

// Кнопка рассчитать
buttonStart.addEventListener('click', function (event) {
  if (salaryAmount.value !== '') {
    appData.start();
  } else {
    event.preventDefault();
    return alert('Поле "Месячный доход" не должно быть пустым!');
  }

  inputTypeText.forEach((element) => {
    element.setAttribute('readonly', true);
  });

  buttonStart.style.display = 'none';
  buttonCansel.style.display = 'block';
});

// Кнопка сброса
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

  inputTypeText.forEach((element) => {
    element.removeAttribute('readonly');
  });
});

buttonExpensesAdd.addEventListener('click', function () {
  appData.addExpensesBlock();
});

buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function (event) {
  periodAmount.textContent = event.target.value;
});