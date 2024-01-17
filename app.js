const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearList = document.querySelector("#clear-todos");

//membuat get todos yang ada di local storage
document.addEventListener("DOMContentLoaded",getTodo)
//membuat event sumbmit add todo
todoForm.addEventListener("submit",addTodo);

//membuat event saat tombol delete diklik
todoList.addEventListener("click",deleteTodo);

//membuat event saat tombol clear to do list di klik
clearList.addEventListener("click",clearTodo);

//Membuat event saat keyboard diketik di input filter maka akan dilakukan function filter todo
filterInput.addEventListener("keyup",filterTodos);

//reusable function
function createElementTodo(value){
	//create element menggunakan DOM
		
	const li = document.createElement("li");
	
	//membuat class li
	li.className = " todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

	//membuat child li berupa text
	li.appendChild(document.createTextNode(value));

	//todo input ini adalah value input yang dimasukkan 
	//user dan akan dijadikan sebagai value dari li
	//membuat child a didalam li
	const a = document.createElement("a");

	//membuat href a
	a.href = "#";
	
	//membuat class a
	a.className ="badge badge-danger delete-todo";

	// membuat text didalam a
	a.innerHTML = "Delete";

	//memasukkan a kedalam li
	li.appendChild(a);

	//memasukkan li kedalam todo-list
	todoList.appendChild(li);
}
function getItemLocalStorage(){
	let todos

	if(localStorage.getItem("todos")==null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"))
	}

	return todos;
}
//function get todo
function getTodo(){
	
	const todos = getItemLocalStorage();
	todos.forEach(todo=>{
		createElementTodo(todo)
	})


}
//membuat function saat terjadi add todo
function addTodo(e){

	//membuat browser tidak melakukan refresh saat klik add todo
	e.preventDefault();

	if(todoInput.value && todoInput.value !== " "){
		createElementTodo(todoInput.value)
		//membuat value terhapus ketika klik add todo list
		addTodoLocalStorage(todoInput.value)

		todoInput.value = "";

		
	}else{
		alert("Tulis todo yang ingin dibuat");
	}


}
function addTodoLocalStorage(todoInputvalue){
	const todos = getItemLocalStorage();

	
	todos.push(todoInputvalue);

	localStorage.setItem("todos",JSON.stringify(todos));

}
//membuat function saat terjadi delete
function deleteTodo(e){
	e.preventDefault();

	//saat user klik bagian delete untuk mengaksesnya makanya menggunakan e.target
	if(e.target.classList.contains("delete-todo")){
		//menampilkan konfirmasi apakah ingin menghapus
		if(confirm("Apakah yakin ingin Menghapus ?"))
		{
			//variable untuk mengakses parent dari anchor delete
			//karena akan menghapus beserta li nya
			const parent = e.target.parentElement;

			//DOM API untuk menghapus parent atau li
			parent.remove();

			deleteTodoLocalStorage(parent);
		}
		
	}
}

//membuat function untuk delete di local storage
function deleteTodoLocalStorage(deleteElement){
	const todos = getItemLocalStorage();
	todos.forEach((todo,index)=>{
		if(deleteElement.firstChild.textContent === todo){
			todos.splice(index, 1);
		}
	})

	localStorage.setItem("todos",JSON.stringify(todos));
}
//membuat function saat terjadi clear todo
function clearTodo(){
	//logikanya didalam id todo-list ada deretan todo
	//saat menggantinya dengan innerHTML = "" maka seolah-olah
	//List sudah terhapus
	todoList.innerHTML = "";

	clearTodoLocalStorage();
}
//membuat function hapus storage
function clearTodoLocalStorage(){
	localStorage.clear();
}
//membuat function saat terjadi keyup
function filterTodos(e){
	//filterItems merupakan variable yang mengambil apa yang user ketik 
	// kemudian mengubahnya ke huruf kecil
	const filterItems = e.target.value.toLowerCase();
	//todoItems adalah variable untuk mengambil element yang ditandai dengan class todo-item
	const todoItems = document.querySelectorAll(".todo-item");

	//foreach todoItems berguna untuk melakukan looping banyaknya Li yang ditandai todoItems
	todoItems.forEach((item)=>{

		//itemText adalah variable yang mengakses firstchild yang merupakan text dan mengubah ke lower case
		const itemText = item.firstChild.textContent.toLowerCase();
		//jika kata di filterItems ada di itemText maka akan mengembalikan true alias !== -1
		if(itemText.indexOf(filterItems) !== -1){
			//dan jika true maka li akan tampil
			item.setAttribute("style","display: block");
		}
		else{
			//jika tidak maka li akan di display none atau hilang
			item.setAttribute("style","display:none !important");
		}
		

	})


	
}