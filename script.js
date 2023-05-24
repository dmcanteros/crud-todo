// crud todo with local storage
document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const todosUL = document.getElementById("todos");

    // retrieve from local storage array of objects
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos) {
        todos.forEach((todo) => {
            addTodo(todo);
        });
    }

    // appended todo will drop below the input tag after pressing "enter"
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        addTodo();
    });

    function addTodo(todo) {
        let todoText = input.value;

        if (todo) {
            todoText = todo.text;
        }

        // text typed on input tag will appear in <li> tag, item will show as completed:false upon checking local storage
        if (todoText) {
            const todoEl = document.createElement("li");
            if (todo && todo.completed) {
                todoEl.classList.add("completed");
            }

            // visible text content within the element
            todoEl.innerText = todoText;

            // left click to toggle when item is mark completed, item will show as completed:true upon checking local storage
            todoEl.addEventListener("click", () => {
                todoEl.classList.toggle("completed");

                // to update local storage
                updateLS();
            });

            // right click to remove list
            todoEl.addEventListener("contextmenu", (e) => {
                e.preventDefault();

                todoEl.remove();

                // to update local storage
                updateLS();
            });

            // creates a new element in <li> tag
            todosUL.appendChild(todoEl);

            // input text will be empty after appending todo
            input.value = "";

            // to update local storage
            updateLS();
        }
    }

    // input todos are stored in local storage
    function updateLS() {
        // selecting all <li> elements
        const todosEl = document.querySelectorAll("li");

        // array
        const todos = [];

        // text in todos' local storage contain as complete
        todosEl.forEach((todoEl) => {
            todos.push({
                text: todoEl.innerText,
                completed: todoEl.classList.contains("completed"),
            });
        });

        // todos stored in browser's local storage
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});