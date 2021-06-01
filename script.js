"use strict";

// Переменные
// let deposit = !!prompt(
//   "Есть ли у вас депозит в банке?",
//   'Нажмите "Ок", если "Да" / "Отмена", если "Нет"'
// ); - оставил, так как за данную переменную ничего не сказано

let money = +prompt("Ваш месячный доход?");
let income = "Фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую?",
  "Квартплата, проездной, кредит"
);
let mission = 1000000;
let costs = prompt(
  "Введите обязательную статью расходов?",
  "Квартплата, проездной, кредит"
);
let sum = +prompt(`Какую сумму Вы тратите на ${costs}?`);
let costs2 = prompt(
  "Введите обязательную статью расходов?",
  "Квартплата, проездной, кредит"
);
let sum2 = +prompt(`Какую сумму Вы тратите на ${costs2}?`);
let budgetDay;

// Функции
const getExpensesMonth = function (costs, costs2) {
  return console.log("Итоговая сумма обязательных расходов:", costs + costs2);
};

const getAccumulatedMonth = function () {
  let budgetMonth = money - (sum + sum2);
  console.log("Накопления за месяц", budgetMonth);
  return budgetMonth;
};

const getTargetMonth = function (accMonth) {
  let period = mission / accMonth;
  return console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев`);
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

// Функционал / логика

const accumulatedMonth = getAccumulatedMonth();
budgetDay = accumulatedMonth / 30;

getExpensesMonth(sum, sum2);
getTargetMonth(accumulatedMonth);
getStatusIncome();

// Мусор

console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);
console.log("money:", typeof money);
console.log("income:", typeof income);
console.log(addExpenses.toLowerCase().split(", "));
