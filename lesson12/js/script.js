'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoButton = todoControl.querySelector('.header-button');
let raw = localStorage.getItem(`memory`);
let todoData = JSON.parse(raw) ? JSON.parse(raw) : [];

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach((item, i) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    });

    const todoRemove = li.querySelector('.todo-remove');

    todoRemove.addEventListener('click', () => {
      li.remove();
      todoData.splice(i, 1);
      localStorage.setItem(`memory`, JSON.stringify(todoData));
    });
  });

  localStorage.setItem(`memory`, JSON.stringify(todoData));
};

todoButton.addEventListener('click', (event) => {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  if (headerInput.value !== '') {
    todoData.push(newTodo);
  } else {
    alert('Введите значение!');
  }

  headerInput.value = '';
  render();
});

render();
