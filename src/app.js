document.addEventListener("DOMContentLoaded", function () {
  const todoUrl = "https://jsonplaceholder.typicode.com/todos";
  const form = document.querySelector("form.todo");
  const list = document.getElementById("tasks");
  let complete = document.getElementById("tasks2");

  function getAllTodos() {
    return new Promise((resolve) => {
      fetch(new Request(todoUrl))
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data);
          localStorage.setItem("todoData", JSON.stringify(data));
        });
    });
  }

  getAllTodos();

  let todoData = [];

  todoData = JSON.parse(localStorage.getItem(todoData));
  // console.log(todoData)

  const saveTodo = () => {
    list.innerHTML = "";
    complete.innerHTML = "";
    todoData.forEach((a, b) => {
      appendTitleToList(a, b);

      console.log(b, a);
    });
  };

  const addData = () => {
    console.log(todoData);
    todoData.unshift({
      id: todoData.length + 1,
      title: textInput.value,
      completed: false,
    });

    localStorage.setItem("todoData", JSON.stringify(todoData));
    saveTodo();
    console.log(todoData);
  };

  (() => {
    todoData = JSON.parse(localStorage.getItem("todoData"));
    saveTodo();
  })();

  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
      console.log("success");
      msg.innerHTML = "";
      addData();
    }
  };

  // function saveTodo(title){
  //     let req = new  Request(todoUrl, {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({title: title })
  //     });

  //     return new Promise(resolve => {
  //         fetch(req)
  //             .then(res => { return res.json(); })
  //             .then(data => { resolve(data); console.log(data) });
  //     })
  // }

  function appendTitleToList(todo) {
    if (todo.completed === false) {
      list.innerHTML += `
            <li data-id="${todo.id}">
                <div class="list-elem-head">
                    <span class="id">${todo.id}</span>
                </div>
                <div class="list-elem-body">
                    <span class="text">${todo.title}</span> 
                    <span class="check">Completed</span>
                    <span class="delete">x</span>
                </div>
            </li>`;
    } else {
      if (todo.completed === true) {
        complete.innerHTML += `
                <li data-id="${todo.id}">
                    <div class="list-elem-head">
                        <span class="id">${todo.id}</span>
                    </div>
                    <div class="list-elem-body">
                        <span class="text">${todo.title}</span>
                    </div>
                </li>`;
      }
    }
  }

  getAllTodos().then((todos) => {
    todos.forEach((todo) => {
      appendTitleToList(todo);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formValidation();
    form.reset();
  });

  list.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const id = e.target.parentElement.parentElement.dataset.id;
      fetch(new Request(`${todoUrl}/${id}`, { method: "DELETE" }));
      document.querySelector(`li[data-id="${id}"]`).outerHTML = "";
    } else if (e.target.classList.contains("check")) {
      const id = e.target.parentElement.parentElement.dataset.id;
      fetch(
        new Request(`$todoUrl/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        })
      )
        .then((response) => response.json())
        .then((json) => console.log(json));
      document.querySelector(`li[data-id="${id}"]`).outerHTML = "";
    }
  });
});
