class Todo {
    constructor(text, id) {
        this.text = text;
        this.id = id;
    }
}

class UI {

    addTodo(todo){
        const list = document.getElementById('todo-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="Todo">${todo.text}</td>
            <td><button class="delete">Delete</button></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#todo-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteTodo(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove();
            this.showAlert('Todo removed!', 'success');
        }
    }

    clearFields(){
        document.getElementById('text').value = '';
    }
}

document.getElementById('todo-form').addEventListener('submit', (e) => {
   const text = document.getElementById('text').value;
   const id = document.getElementById('todo-list').childElementCount + 1;

   const todo = new Todo(text, id);
   const ui = new UI();

   if (text === ''){
       ui.showAlert('Please fill in all fields', 'error')
   } else {
       ui.addTodo(todo);
       ui.showAlert('Todo added', 'success');
       ui.clearFields();
   }
   e.preventDefault();
});

document.getElementById('todo-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteTodo(e.target);
    e.preventDefault();
});
