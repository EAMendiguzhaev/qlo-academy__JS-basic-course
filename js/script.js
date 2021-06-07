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
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

// let money;

// const isNumber = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

// const start = function () {
//   do {
//     money = +prompt('Ваш месячный доход?');
//   } while (!isNumber(money));
// };

// start();

// let appData = {
//   income: {},
//   addIncome: [],
//   expenses: {},
//   addExpenses: [],
//   deposit: false,
//   percentDeposit: 0,
//   moneyDeposit: 0,
//   mission: 1000000,
//   period: 14,
//   asking: () => {
//     if (confirm('Eсть ли у Вас дополнительный источник заработка?')) {
//       let itemIncome;
//       let cashIncome;

//       do {
//         itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
//       } while (isNumber(itemIncome));

//       do {
//         cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', '10000');
//       } while (!isNumber(cashIncome));
//       appData.income[itemIncome] = cashIncome;
//     }

//     let addExpenses;

//     do {
//       addExpenses = prompt(
//         'Перечислите возможные расходы за рассчитываемый период через запятую?',
//         'Квартплата, проездной, кредит',
//       );
//     } while (isNumber(addExpenses));

//     appData.addExpenses = addExpenses.toLowerCase().split(', ');

//     let sum = 0;

//     for (let i = 0; i < 2; i++) {
//       let question;
//       do {
//         question = prompt('Введите обязательную статью расходов?', 'Квартплата, проездной, кредит');
//       } while (isNumber(question));

//       let answer = prompt('Во сколько Вам это обойдётся?');
//       if (!isNumber(answer)) {
//         do {
//           answer = prompt('Во сколько Вам это обойдётся?');
//         } while (!isNumber(answer));
//       }

//       sum += +answer;
//       console.log(`${question}: ${answer}`);
//       appData.expenses[question] = +answer;
//     }
//     console.log('Итоговая сумма обязательных расходов:', sum);
//   },
//   budget: money,
//   budgetDay: 0,
//   budgetMonth: 0,
//   expensesMonth: 0,
//   getExpensesMonth: () => {
//     for (let key in appData.expenses) {
//       appData.expensesMonth += appData.expenses[key];
//     }
//   },
//   getBudget: () => {
//     appData.budgetMonth = appData.budget - appData.expensesMonth;
//     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//     console.log('Накопления за месяц', appData.budgetMonth);
//     console.log('Бюджет в день', appData.budgetDay);
//   },
//   getTargetMonth: () => {
//     let period = appData.mission / appData.budgetMonth;

//     if (period < 0) {
//       return console.log('Цель не будет достигнута');
//     } else {
//       return console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев`);
//     }
//   },

//   getStatusIncome: () => {
//     if (appData.budgetDay >= 1200) {
//       console.log('У вас высокий уровень дохода');
//     } else if (appData.budgetDay >= 600 && appData.udgetDay < 1200) {
//       console.log('У вас средний уровень дохода');
//     } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
//       console.log('К сожалению у вас уровень дохода ниже среднего');
//     } else if (appData.budgetDay < 0) {
//       console.log('Что то пошло не так');
//     }
//   },
//   getInfoDeposit: () => {
//     appData.deposit = confirm('Есть ли у вас депозит в банке?');
//     if (appData.deposit) {
//       do {
//         appData.percentDeposit = prompt('Какой годовой процент?', '10');
//       } while (!isNumber(appData.percentDeposit));
//       console.log(`Проценты в банке: ${appData.percentDeposit}%`);

//       do {
//         appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
//       } while (!isNumber(appData.moneyDeposit));
//       console.log(`Сумма депозита: ${appData.moneyDeposit}`);
//     }
//   },
//   calcSavedMoney: () => appData.budgetMonth * appData.period,
// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// appData.calcSavedMoney();

// console.log(appData.addExpenses.map((n) => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные: ' + 'свойства: ' + key + ';' + ' значения: ' + appData[key]);
// }
