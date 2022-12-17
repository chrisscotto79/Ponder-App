import React, { useState } from "react";
import './Todo.css'



export default function Todo(){
    const [todo, addTodo] = useState("");

    const [todos, setTodos] = useState([]);
    

    const clear = () => setTodos([]);

    function addTask(){

        if(!todo){
            alert('Enter a task');
            return;
        }

        const task = {
            id: Math.floor(Math.random()* 1000),
            value: todo
        };

        setTodos(oldList => [...oldList, task]);
        addTodo("")
    };

    function deleteTask(id){
        const newArray = todos.filter(task => task.id !== id);
        setTodos(newArray);
    };

    const strike = event => {
        if (event.target.style.textDecoration) {
          event.target.style.removeProperty('text-decoration');
          event.target.style.removeProperty('color');

        } else {
          event.target.style.setProperty('text-decoration', 'line-through');
          event.target.style.setProperty('color', 'rgb(127, 255, 0)');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    

    return(
        <>
        <div className="sideTodo">
        <div>
            <h2>
                Todo List
            </h2>
            <span className="formatInput">
               <input
               onKeyDown={handleKeyDown}
            className="todoInput"
            type={'text'}
            placeholder='Add a task...'
            value={todo}
            onChange={e => addTodo(e.target.value)}/>

            <button  className="addButton" onClick={()=> addTask()}>Add</button>

            </span>
            
            <div className="todosList">
                {todos.map(task=> {
                    return(
                        <>
                        <span className="formatList">
                        
                            <div className="format1">
                                <p onClick={strike} key ={task.id}> {task.value}</p>
                            </div>

                            <div className="format2">
                               <button className='deleteTask' onClick={() => deleteTask(task.id)}>X</button>
        
                            </div>

                            
                        
                        </span>
                        
                        
                        </>
                        
                    )
                })}
            </div>
            <div className="bottomNav">
                <button className="bottomButton" onClick={clear}>Clear</button>

            </div>
            
        </div>
    </div>
        </>
    )
}