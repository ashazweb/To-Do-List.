const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.trim() === "") return;

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerHTML = `${todoInput.value}<span class="hover-cross" title="Mark as completed"> ❌</span>`;
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList.contains("delete-btn")) {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  if (item.classList.contains("hover-cross")) {
    const todo = item.closest(".todo");
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (todo.nodeType === 1) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
          break;
        case "incomplete":
          todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerHTML = `${todo}<span class="hover-cross" title="Mark as completed"> ❌</span>`;
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todoElement) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todoElement.querySelector(".todo-item").innerText.trim();
  const cleanedText = todoText.replace("❌", "").trim();
  todos = todos.filter((t) => t !== cleanedText);
  localStorage.setItem("todos", JSON.stringify(todos));
}
