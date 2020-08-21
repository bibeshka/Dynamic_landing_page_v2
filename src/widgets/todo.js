class Todo {
	constructor(todoInput, todoAddButton , todoUl) {
		this.todoInput = todoInput;
		this.todoAddButton = todoAddButton;
		this.todoUl = todoUl;
	}

	createTodo() {
		const li = document.createElement("li");
		const textSpan = document.createElement("span");
		textSpan.classList.add('todo-text');
		const newTodo = this.todoInput.value;
		textSpan.append(newTodo);
		li.append(textSpan)
		this.todoUl.append(li);

		const deleteBtn = document.createElement("span");
		deleteBtn.classList.add("todo-trash");
		const icon = document.createElement("i");
		icon.classList.add("fas", "fa-trash-alt");
		deleteBtn.appendChild(icon);

		this.todoUl.appendChild(li).append(textSpan, deleteBtn);
		this.todoInput.value = "";
		Todo.deleteTodo(deleteBtn);

		localStorage.setItem("todos", this.todoUl.innerHTML);
	}

	static deleteTodo(element) {
		element.addEventListener("click", (event) => {
			element.parentElement.remove();
			event.stopPropagation();
		})
	}

	onClickTodo(event, ul) {
		if(event.target.tagName === "LI") {
			event.target.classList.toggle("checked");
			localStorage.setItem("todos", ul.innerHTML);
		}
	}

	loadTodo() {
		const data = localStorage.getItem("todos");
		if(data) {
			this.todoUl.innerHTML = data;
		}
		const deleteButtons = document.querySelectorAll("span.todo-trash");
		for(const button of deleteButtons) {
			Todo.deleteTodo(button);
		}		
	}

}

module.exports = Todo;