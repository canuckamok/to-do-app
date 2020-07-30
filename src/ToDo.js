import React, { useState, useEffect } from "react";
import CollapsiblePanel from "./Components/CollapsiblePanel.js"

function ToDosComponent(){
	//const [collapse, setCollapse] = useState(true);
	const [currentTodo, setCurrentTodo] = useState("");
	const storedTodos = JSON.parse(localStorage.getItem("todos"))
	const [todos, setTodos] = useState(storedTodos);
		useEffect(
		() => {
			localStorage.setItem("todos", JSON.stringify(todos))
		}, [todos]
		);
	
function createNewTodo (currentTodo){
	let todosArray = [...todos];
	todosArray.push({
		todo: currentTodo,
		isCompleted: false
	});
	setTodos(todosArray);
	//setLocalStorage();
	
}

function completeTodo(index){
	const todosArray = [...todos];
	todosArray[index].isCompleted = !todosArray[index].isCompleted;
	setTodos(todosArray);
}

function deleteTodo(index){
	const todosArray = [...todos];
	todosArray.splice(index, 1);
	setTodos(todosArray);
}



	return (
		//<CollapsiblePanel title="To-do list" collapse = {collapse}>
		<div className = "appContainer">
			<input 
			className = "todo-input"
			value = {currentTodo}
			onChange={e =>{
				setCurrentTodo(e.target.value);
			}}
			onKeyPress= {e => {
				if (e.key === "Enter") {
					createNewTodo(currentTodo);
					setCurrentTodo("");
				}
			}}
			placeholder = "type a list item here"
			/>
			<div className="instruction"><p>click on an item to cross it off</p></div>
			{todos.map((todo, index) => (
					<div className = "container">
					<div key={todo} className="todo" onClick = {() => completeTodo(index)}>
					
					<div className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
					</div>
					<div className="delete" onClick={() => deleteTodo(index)}>X</div>
					</div>
				))
		}
			<div className="listCount">{todos.length > 0 && `${todos.length} items`} </div>
		</div>
		//</CollapsiblePanel>
	);
}

export default ToDosComponent;