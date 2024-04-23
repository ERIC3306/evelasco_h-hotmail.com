import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
    //Obtenemos el objeto 'todos' del localStorage del navegador y lo guardamos en la memoria del navegador, para que el refrescar la pagina no se borre el objeto de la pagina
    return JSON.parse(localStorage.getItem('todos')) || [];     //parse, opuesto a stringify, pasa una cadena a un objeto
}

export const useTodos = () => {
  
    //'todos', posee el estado inicial       
    //dispatch, es un despliegue de los nuevos elementos del estado, permite modificar el state  
    const [ todos, dispatch ] = useReducer( todoReducer, [], init );    //useReducer(todoReducer, estadoInicial, funcion que inicializa el reducer)

    useEffect(() => {
        //Colocamos el objeto 'todos' en el local storage.      //En el localStorage solo se pueden guardar cadenas
      localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])     //solo se dispara cuando hay un cambio en el objeto 'todos'
    

    //Nuevo objeto 'todo'
    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    //Borrar todo
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    //Cambiar valor booleano para poder descartar tareas realizadas
    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    return {
        todos,

        todosCount: todos.length,       //Cuneta la cantidad de todos
        pendingTodosCount: todos.filter(todo=> !todo.done).length,      //Cuenta la cantidad de tareas pendientes

        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }

}