const add_todo = document.getElementById('add_todo')
const button_window = document.getElementById('button_window')
const delete_button = document.getElementById('todo_delete')
const todo = document.getElementById('todo');

let viewTodo = document.getElementById("outputTodoList")

const viewTodoList = (todoList) => {
    for(const todo of todoList) {
        addTodoList(todo)
    }
}

const addTodoList = (todo) => {
    let li = document.createElement("li")
    li.textContent = todo
    viewTodo.appendChild(li)
}

add_todo.addEventListener('click', async () => {
    const todoList = await window.myAPI.getTodoList()
    todoList.push(todo.value)
    await window.myAPI.setTodoList(todoList)
    addTodoList(todo.value)
})

button_window.addEventListener('click',async () => {
    await window.myAPI.openWindow()
})

delete_button.addEventListener('click',async () => {
    await window.myAPI.deleteTodoList()
    while (viewTodo.firstChild) {
        viewTodo.removeChild(viewTodo.firstChild)
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    const todoList = await window.myAPI.getTodoList()
    viewTodoList(todoList)
});