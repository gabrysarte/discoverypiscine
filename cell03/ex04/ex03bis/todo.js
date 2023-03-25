// const todo = ['aa', 'bbb', 'ccc'];
let todos = [];
const key = 'todo';
// const saveTodos = () => Cookies.set(key, JSON.stringify(todos));
const saveTodos = () => Cookies.set(key, JSON.stringify(todos));
const getTodos = () => Cookies.get(key) ? JSON.parse(Cookies.get(key)) : undefined;

$('document').ready(() => {
	const savedTodo = getTodos();
	if (savedTodo && savedTodo.length > 0) {
		todos = savedTodo;
		renderList();
	}
})

function renderList() {
	const id = '#ft_list'
	$(id).empty();
	todos.forEach((el, i) => createListElement(`todo${i}`, el).appendTo(id));
}

function newItem() {
	let value = prompt("Please enter your new todo");
	if (!value) { return; }
	todos.unshift(value);
	saveTodos();
	renderList();
};

function removeItem(event) {
	const value = event.target.textContent;
	const confirm = window.confirm(`Do you want to remove "${value}"`);
	if (confirm) {
		const index = todos.findIndex(el => el === value);
		todos.splice(index, 1);
		saveTodos();
		renderList();
	}
}

function createListElement(id, value) {
	return $('<li>', {
		id,
		class: 'list-item',
		text: value,
		click: removeItem,
	});
}
