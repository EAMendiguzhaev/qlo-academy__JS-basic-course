'use strict';
const buttonStart = document.getElementById('start');
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

const inputName = document.querySelectorAll('input[placeholder = "Наименование"]');
const inputAmount = document.querySelectorAll('input[placeholder = "Сумма"]');

let expensesItems = document.querySelectorAll('.expenses-items');
const expensesItemTemplete = expensesItems[0].cloneNode(true);
let incomeItems = document.querySelectorAll('.income-items');
const incomeItemTemplete = incomeItems[0].cloneNode(true);

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
    appData.budget = salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
    // consolePrint();
  },
  showResult: () => {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();

    periodSelect.addEventListener('input', function (event) {
      incomePeriodValue.value = event.target.value * appData.budget;
    });
  },
  getExpenses: () => {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getAddExpenses: () => {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  addExpensesBlock: () => {
    let cloneExpensesItem = expensesItemTemplete.cloneNode(true);
    buttonExpensesAdd.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      buttonExpensesAdd.style.display = 'none';
    }
  },
  getIncome: () => {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddIncome: () => {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  addIncomeBlock: () => {
    let cloneIncomeItem = incomeItemTemplete.cloneNode(true);
    buttonIncomeAdd.before(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      buttonIncomeAdd.style.display = 'none';
    }
  },
  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += parseInt(appData.expenses[key]);
    }
  },
  getBudget: () => {
    appData.budgetMonth = parseInt(appData.budget) + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: () => {
    return targetAmount.value / appData.budgetMonth;
  },

  getStatusIncome: () => {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.udgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      console.log('Что то пошло не так');
    }
  },
  getInfoDeposit: () => {
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit));
      console.log(`Проценты в банке: ${appData.percentDeposit}%`);

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(appData.moneyDeposit));
      console.log(`Сумма депозита: ${appData.moneyDeposit}`);
    }
  },
  calcPeriod: () => appData.budgetMonth * periodSelect.value,
};

//Функция вывода на консоль
function consolePrint() {
  console.log('Наша программа включает в себя данные: ');
  for (let key in appData) {
    console.log('Ключ: ' + key + ' значение: ' + appData[key]);
  }

  console.log('Месячный доход: ' + appData.budget);

  console.log('Дополнительный доход: ');
  for (let key in appData.income) {
    console.log('Ключ: ' + key + ' значение: ' + appData.income[key]);
  }

  console.log('Обязательные расходы: ');
  for (let key in appData.expenses) {
    console.log('Ключ: ' + key + ' значение: ' + appData.expenses[key]);
  }

  console.log(Math.ceil(appData.getTargetMonth()));
}

//Функция проверяет является буквой или нет
const isStr = (str) => {
  let reg = /^[а-яА-Я ,]+$/;
  return reg.test(str);
};

//Функция делает первую букву заглавной
const ucFirst = (str) => {
  if (str === '') {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

//Валидации полей
inputName.forEach((item) => {
  item.addEventListener('input', function (event) {
    if (event.target.value !== '' && !isStr(event.target.value)) {
      alert('В данном поле допустимы только буквы русского алфавита!');
      event.target.value = event.target.value.replace(/[^а-яА-Я ,]+$/g, '');
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

buttonStart.addEventListener('click', (event) => {
  if (salaryAmount.value !== '') {
    appData.start();
  } else {
    event.preventDefault();
    return alert('Поле "Месячный доход" не должно быть пустым!');
  }
});
buttonExpensesAdd.addEventListener('click', () => {
  appData.addExpensesBlock();
});
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function (event) {
  periodAmount.textContent = event.target.value;
});
