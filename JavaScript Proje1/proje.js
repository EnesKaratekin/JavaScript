//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  //Tum event listenerar

  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm("Tümü Silmek İstedğini emin misiniz")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }

  //ara yüzden todoları temizleme
}

function filterTodos(e) {
  // arama yapildiğı zaman yakın todolar cıkıyor

  const filterValue = e.target.value.toLowerCase(); // kücük harfe cevirme
  const listItem = document.querySelectorAll(".list-group-item");

  listItem.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //bulamadi
      listItem.setAttribute("style", "display : none  !important");
    } else {
      listItem.setAttribute("style", "display : block ");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodosFromStrage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo başarıyla silindi");
  }

  function deleteTodosFromStrage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
      if (todo === deleteTodo) {
        todos.splice(index, 1); //Arraydan değeri silme
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
function loadAllTodosToUI() {
  //
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  e.preventDefault();
  const newTodo = todoInput.value.trim(); //trim basta ve sondak' bosluu alir
  const todos = getTodosFromStorage();
  const checkTodo = todos.find((todo) => todo === newTodo);

  if (checkTodo) {
    showAlert("danger", "Lütfen onceden girmediginiz bir todo ekleyin...");
    return;
  }
  if (newTodo === "") {
    showAlert("danger", "Lütfen bır todo girin...");
    return;
  }
  addTodoToUI(newTodo);
  addTodoToStorage(newTodo);
  showAlert("success", "Başarıyla eklendi");
}
function getTodosFromStorage() {
  //Storageden todolari alma
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  //Anlamadim
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`; //Anlamadim
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    //1 saniye sonra gelen uyari gidiyor
    alert.remove();
  }, 1000);
}

//List Item Olusturma
function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  //Link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  //Text Node Ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //Todo Liste list itemi ekleme

  todoList.appendChild(listItem);
  todoInput.value = "";
}
