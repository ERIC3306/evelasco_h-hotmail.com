import { useState } from 'react';


export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,       // Manda una copia de las propiedades del formState (username, email, password)
        formState,
        onInputChange,
        onResetForm,
    }
}