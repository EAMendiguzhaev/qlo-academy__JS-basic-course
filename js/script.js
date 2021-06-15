'use strict';
const buttonStart = document.getElementById('start');
const buttonCansel = document.getElementById('cancel');
const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesItemTemplete = expensesItems[0].cloneNode(true);
let incomeItems = document.querySelectorAll('.income-items');
const incomeItemTemplete = incomeItems[0].cloneNode(true);
const сalcInputs = document.querySelectorAll('input[type=text]');
const resultColumn = document.querySelector('.result');

//Функция проверяет является цифрой
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Функция проверяет является буквой или нет
const isStr = function (str) {
  const reg = /^[а-яА-Я ,]+$/;
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
  const inputName = document.querySelectorAll('input[placeholder = "Наименование"');
  const inputAmount = document.querySelectorAll('input[placeholder = "Сумма"]');
  const possibleСosts = document.querySelector('input[placeholder = "название"]');

  inputName.forEach((item) => {
    item.addEventListener('input', function (event) {
      if (event.target.value !== '' && !isStr(event.target.value)) {
        alert('В данном поле допустимы только буквы русского алфавита!');
        event.target.value = event.target.value.replace(/[^[^а-яА-Я ,]+$/g, '');
      }
    });
  });

  inputAmount.forEach((item) => {
    item.addEventListener('input', function (event) {
      if (event.target.value !== '' && !isNumber(event.target.value)) {
        alert('В данном поле допустимы только цифры!');
        event.target.value = event.target.value.replace(/[^\d]+$/g, '');
      }
    });
  });

  possibleСosts.addEventListener('input', function (event) {
    if (event.target.value !== '' && !isStr(event.target.value)) {
      alert('В данном поле допустимы только буквы русского алфавита!');
      event.target.value = event.target.value.replace(/[^а-яА-Я ,]+$/g, '');
    }
  });

  depositPercent.addEventListener('input', () => {
    if (depositPercent.value !== '' && !isNumber(depositPercent.value)) {
      alert('В данном поле допустимы только цифры от 1 до 100!');
      depositPercent.value = depositPercent.value.replace(/[^\d]+$/g, '');
    } else if (depositPercent.value < 1 || depositPercent.value > 100) {
      alert('Введите корректное значение в поле проценты!');
      depositPercent.value = 1;
    }
  });
};

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.expenses = {};
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.addIncome = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  start() {
    this.budget = salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  }

  getExpInc() {
    const _this = this;
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for (const key in this.income) {
      _this.incomeMonth += +_this.income[key];
    }
  }

  addExpIncBlock(element, button, group) {
    const cloneExpensesItem = element.cloneNode(true);
    button.before(cloneExpensesItem);
    validateFunction();

    if (group.length === 2) {
      button.style.display = 'none';
    }
  }

  getExpensesMonth() {
    this.expensesMonth = 0;
    for (const key in this.expenses) {
      this.expensesMonth += parseInt(this.expenses[key]);
    }
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.udgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      console.log('Что то пошло не так');
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposite * (this.percentDeposit / 100);

    this.budgetMonth =
      parseInt(this.budget) + this.incomeMonth - this.expensesMonth + (monthDeposit ? monthDeposit : 0);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
      if (depositBank.value !== 'other') {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposite = depositAmount.value;
      } else {
        this.percentDeposit = depositPercent.value / 100;
        this.moneyDeposite = depositAmount.value;
      }
    }
  }

  changePersent() {
    const valueSelect = this.value;

    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.disabled = false;
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = '';
      depositPercent.disabled = true;
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';

      this.deposit = true;
      depositBank.addEventListener('change', this.changePersent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';

      depositBank.value = '';
      depositAmount.value = '';

      this.deposit = false;
      depositBank.removeEventListener('change', this.changePersent);
    }
  }

  eventsListeners() {
    const _this = this;
    // Кнопка Рассчитать
    buttonStart.addEventListener('click', function (event) {
      if (salaryAmount.value !== '') {
        _this.start();
      } else {
        event.preventDefault();
        return alert('Поле "Месячный доход" не должно быть пустым!');
      }

      if (depositCheck.checked && depositBank.value === 'other' && depositPercent.value === '') {
        return alert('Банковская ставка не должна быть пустой!');
      }

      document.querySelectorAll('input[type = text]').forEach((item) => (item.disabled = true));

      buttonIncomeAdd.disabled = true;
      buttonExpensesAdd.disabled = true;
      buttonStart.style.display = 'none';
      buttonCansel.style.display = 'block';
      periodSelect.disabled = true;
      depositCheck.disabled = true;
      depositBank.disabled = true;
    });

    // Кнопка Сбросить
    buttonCansel.addEventListener('click', function () {
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

      document.querySelectorAll('input[type = text]').forEach((item) => (item.disabled = false));

      buttonIncomeAdd.disabled = false;
      buttonExpensesAdd.disabled = false;
      buttonStart.style.display = 'block';
      buttonCansel.style.display = 'none';
      periodSelect.disabled = false;
      periodSelect.value = '1';
      periodAmount.textContent = '1';

      depositCheck.checked = false;
      depositCheck.disabled = false;
      depositBank.disabled = false;
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
    });

    buttonExpensesAdd.addEventListener('click', function () {
      _this.addExpIncBlock(expensesItemTemplete, buttonExpensesAdd, document.querySelectorAll('.expenses-items'));
      expensesItems = document.querySelectorAll('.expenses-items');
    });

    buttonIncomeAdd.addEventListener('click', function () {
      _this.addExpIncBlock(incomeItemTemplete, buttonIncomeAdd, document.querySelectorAll('.income-items'));
      incomeItems = document.querySelectorAll('.income-items');
    });

    periodSelect.addEventListener('input', function (event) {
      periodAmount.textContent = event.target.value;
    });

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();

appData.eventsListeners();
validateFunction();
