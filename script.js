"use strict";
let money;

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function () {
  do {
    money = +prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 14,
  asking: () => {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую?",
      "Квартплата, проездной, кредит"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let question = prompt(
        "Введите обязательную статью расходов?",
        "Квартплата, проездной, кредит"
      );

      let answer = prompt("Во сколько Вам это обойдётся?");
      if (!isNumber(answer)) {
        return (answer = prompt("Во сколько Вам это обойдётся?"));
      }

      sum += +answer;
      console.log(`${question}: ${answer}`);
      appData.expenses[question] = +answer;
    }
    console.log("Итоговая сумма обязательных расходов:", sum);
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    console.log("Накопления за месяц", appData.budgetMonth);
  },
  getTargetMonth: () => {
    let period = appData.mission / appData.budgetMonth;

    if (period < 0) {
      return console.log("Цель не будет достигнута");
    } else {
      return console.log(
        `Цель будет достигнута за ${Math.ceil(period)} месяцев`
      );
    }
  },

  getStatusIncome: () => {
    if (appData.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (appData.budgetDay >= 600 && appData.udgetDay < 1200) {
      console.log("У вас средний уровень дохода");
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      console.log("К сожалению у вас уровень дохода ниже среднего");
    } else if (appData.budgetDay < 0) {
      console.log("Что то пошло не так");
    }
  },
};

for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные: " +
      "свойства: " +
      key +
      ";" +
      " значения: " +
      appData[key]
  );
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
