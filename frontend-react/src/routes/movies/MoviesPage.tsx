import { useState } from 'react';
import { FormSelection } from './components';
import { FindMoviesForm } from './components/FindMoviesForm';

/**
 * The movies page, functional component
 * 
 * This is the main component for the movies page
 * It contains the backend selection and the form selection, and the form itself
 * 
 * We want the user to be able to select the form they want to use, either
 * - find movies
 * - add movies
 * 
 * So we need a state to store the form, and a function to set the form 
 * And that goes into a child component which is the FormSelection component
 * in which we set the form
 * 
 * @returns 
 */
function MovieList() : JSX.Element {
    // we need a state to store the form
    // - this is used to pass down to the FormSelection component
    // this way this component is simply a container and does not have to handle the form selection

    // a useState hook gives access to a state and a function to set the state
    const [form, setForm] = useState(<FindMoviesForm />);
    
    return (
        <div>
            {/* now we add the forms */}
            <FormSelection setForm={setForm} />
            {/* and the form itself */}
            {form}
        </div>
    );
}

export {
    MovieList
}