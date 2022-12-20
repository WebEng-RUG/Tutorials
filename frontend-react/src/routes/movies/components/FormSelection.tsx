import React from 'react';
import { FindMoviesForm } from './FindMoviesForm';
import { AddMovieForm } from './AddMovieForm';

/**
 * The props object / interface for the form selection component
 * We put this on top of the component so that we can use it in the component
 * and export it if necessary
 */
interface FormSelectionProps {
    setForm: (form: JSX.Element) => void;
}

/**
 * The form selection component
 * 
 * @param setForm the setForm and backend props which is passed down from the parent
 * @returns the form selected
 */
function FormSelection({ setForm } : FormSelectionProps) : JSX.Element {
    /**
     * handles the select event of the form selection
     * 
     * @param event the event from the element
     */
    const handleSelect = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
        const value = event.currentTarget.value;

        let form = null;

        /** the find movies form was selected */
        if (value === 'add') {
            form = <AddMovieForm />;
        }
        /** the add movie form was selected */
        else if (value === 'find') {
            form = <FindMoviesForm />;
        }
        else {
            return alert('unknown form selected');
        }
        // set the form which is a state in the parent
        setForm(form);
    }

    

    return (
        <div>
            <button onClick={(e) => handleSelect(e)} value="add">Add Movie</button>
            <button onClick={(e) => handleSelect(e)} value="find">Find Movies</button>
        </div>
    );
}


export {
    FormSelection
}