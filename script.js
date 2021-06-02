"use strict";

// Переменные

let deposit = !!prompt(
  "Есть ли у вас депозит в банке?",
  'Нажмите "Ок", если "Да" / "Отмена", если "Нет"'
);
let money;
let income = "Фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую?",
  "Квартплата, проездной, кредит"
);
let mission = 1000000;
let budgetDay;
let expenses = [];

// Функции

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt(
      "Введите обязательную статью расходов?",
      "Квартплата, проездной, кредит"
    );

    do {
      sum = prompt("Во сколько Вам это обойдётся?");
    } while (!isNumber(sum));
  }

  console.log("Итоговая сумма обязательных расходов:", sum);
  return sum;
};

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function () {
  let budgetMonth = money - expensesAmount;
  console.log("Накопления за месяц", budgetMonth);
  return budgetMonth;
};

const getTargetMonth = function (accMonth) {
  let period = mission / accMonth;

  if (period < 0) {
    return console.log("Цель не будет достигнута");
  } else {
    return console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев`);
  }
};

const getStatusIncome = function () {
  if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log("У вас средний уровень дохода");
  } else if (budgetDay < 600 && budgetDay >= 0) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    console.log("Что то пошло не так");
  }
};

const showTypeof = function (item) {
  return console.log(typeof item);
};

// Функционал / логика

start();
const accumulatedMonth = getAccumulatedMonth();
budgetDay = accumulatedMonth / 30;
getTargetMonth(accumulatedMonth);
getStatusIncome();
showTypeof(+money);
showTypeof(income);
showTypeof(deposit);

// Мусор

console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);
console.log(addExpenses.toLowerCase().split(", "));
