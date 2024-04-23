// { type: [todo remove], payload: id }

export const todoReducer = ( initialState = [], action ) => {


    switch ( action.type ) {
        case '[TODO] Add Todo':
            return [ ...initialState, action.payload ];     //Inserta el todo a traves del payload en el Initialstate
            // throw new Error ('Action.type = '[TODO] Add Todo' no esta implementada')       //En caso de que aun no exista una accion a ejecutar podemos mandar un mensaje de error

        case '[TODO] Remove Todo':
            return initialState.filter( todo => todo.id !== action.payload );       //Retorna un nuevo arreglo, todos los 'todo' que sean diferentes al 'todo' seleccionado en nuestra accion, al estado inicial

        case '[TODO] Toggle Todo':
            return initialState.map( todo => {              //map, Transforma el arreglo en otro arreglo en base al codigo a ejecutar
                if ( todo.id === action.payload ) {         //Si el id del todo es igual al id del todo de nuestra accion 
                                                            //retorna el todo pero con el valor booleano contrario (TRUE-FALSE / FALSE-TRUE)
                    return {
                        ...todo,
                        done: !todo.done
                    }
                } 
                return todo;                                //Si no retorna el mismo todo
            });
    
        default:
            return initialState;
    }
}