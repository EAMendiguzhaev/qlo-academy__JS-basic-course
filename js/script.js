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

let expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 14,
  start: function () {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }

    appData.budget = salaryAmount.value;
    appData.getExpenses();

    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.showResult();
  },
  showResult: () => {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
  },
  addExpensesBlock: () => {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      buttonExpensesAdd.style.display = 'none';
    }
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
  getAddIncome: () => {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  asking: () => {
    if (confirm('Eсть ли у Вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome;

      do {
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      } while (isNumber(itemIncome));

      do {
        cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', '10000');
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses;

    do {
      addExpenses = prompt(
        'Перечислите возможные расходы за рассчитываемый период через запятую?',
        'Квартплата, проездной, кредит',
      );
    } while (isNumber(addExpenses));

    appData.addExpenses = addExpenses.toLowerCase().split(', ');
  },
  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += parseInt(appData.expenses[key]);
    }
  },
  getBudget: () => {
    appData.budgetMonth = parseInt(appData.budget) - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    console.log('Накопления за месяц', appData.budgetMonth);
    console.log('Бюджет в день', appData.budgetDay);
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
  calcSavedMoney: () => appData.budgetMonth * appData.period,
};

buttonStart.addEventListener('click', appData.start);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);

// console.log(appData.addExpenses.map((n) => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные: ' + 'свойства: ' + key + ';' + ' значения: ' + appData[key]);
// }
