document.addEventListener('DOMContentLoaded', function(){

    const todoUrl ='https://jsonplaceholder.typicode.com/todos';
    const form =document.querySelector('form.todo');
    const list = document.getElementById("tasks");
    let complete = document.getElementById("tasks2");
    let Check = document.querySelectorAll(".checkBox");

    function getAllTodos(){
        return new Promise((resolve => {
            fetch(new Request(todoUrl)).
            then( res => {
                return res.json();
            })
            .then(data => {resolve(data);});
        }))
    }

    function saveTodo(title){
        let req = new  Request(todoUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title})
        });

        return new Promise(resolve => {
            fetch(req)
                .then(res => { return res.json(); })
                .then(data => { resolve(data); });
        })
    }

    // function completedTodo(){
    //     let req = new  Request(todoUrl, {
    //         method: 'PATCH',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({completed: true})
    //     });

    //     return new Promise(resolve => {
    //         fetch(req)
    //             .then(res => { return res.json(); })
    //             .then(data => { resolve(data); });
    //     })
    // }


    function appendTitleToList(todo){
        if(todo.completed === false){
            list.innerHTML += `
            <li data-id="${todo.id}">
                <div class="list-elem-head">
                    <span class="id">${todo.id}</span>
                </div>
                <div class="list-elem-body">
                    <span class="text">${todo.title}</span>
                    <i class="fa fa-edit"></i>
                    <span class="check">Completed</span>
                    <span class="delete">x</span>
                </div>
            </li>`
        }        
    }

    getAllTodos().then(todos => {
        todos.forEach(todo => { appendTitleToList(todo);});
    })

    function completedTodoList(todo){
        if(todo.completed === true){
            complete.innerHTML += `
            <li data-id="${todo.id}">
                <div class="list-elem-head">
                    <span class="id">${todo.id}</span>
                </div>
                <div class="list-elem-body">
                    <span class="text">${todo.title}</span>
                    <i class="fa fa-edit"></i>
                    <span class="delete">x</span>
                </div>
            </li>`
        }
    }

    getAllTodos().then(todos => {
        todos.forEach(todo => { completedTodoList(todo);});
    })

    form.addEventListener('submit',function(e){
        e.preventDefault();
        saveTodo(form.task.value).then(res => {
            appendTitleToList(res);
        });
        form.reset();
    })
    
//     var stringifyTodos = JSON.stringify(todoUrl);
// sessionStorage.setItem("todosUrl", stringifyTodos);
// document.getElementById("userArray").innerHTML = 
//     sessionStorage.getItem("todosUrl");
// var retrieveTodos = 
//     JSON.parse(sessionStorage["todosUrl"])
// document.getElementById("retrieveIndex").innerHTML 
//     = retrieveTodos[0];

    list.addEventListener('click', function(e){
        if(e.target.classList.contains('delete')){
            const id = e.target.parentElement.parentElement.dataset.id;
            fetch(new Request(`${todoUrl}/${id}`,{ method: 'DELETE'}));
            document.querySelector(`li[data-id="${id}"]`).outerHTML = "";
        }

        else if(e.target.classList.contains('check')){
            const id =e.target.parentElement.parentElement.dataset.id;
            fetch( new Request(`$todoUrl/${id}`, {
                method: 'PATCH', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({completed: true})}));
            document.querySelector(`li[data-id="${id}"]`).outerHTML = "";
        }
    })
    
})