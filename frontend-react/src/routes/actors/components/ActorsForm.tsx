import { useContext, useEffect, useState } from "react";
import { getActors } from "../../../api";
import { Actor, PaginationQuery, SetActors } from "../../../models";
import { BackendContext } from "../../BackendContext";
import { Pagination } from "../../components/Pagination";

/**
 * Form to retrieve actors from the backend
 * 
 * @param setActors backend and setActors props which is passed down from the parent
 * @returns a form to retrieve actors
 */
function ActorsForm({ setActors } : SetActors) {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);
    
    // we need a limit and offset to handle pagination
    // - limit is the number of results per page
    // - offset is the number of results to skip
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    // we need a state to store the order direction
    const [orderDir, setOrderDir] = useState('asc');
    // we need a state to store the order by
    const [orderBy, setOrderBy] = useState('id');


    /**
     * Retrieve actors from the backend
     * 
     * @param event optional event to prevent default if called from a form
     */
    async function retrieveActors (event? : React.FormEvent<HTMLFormElement>) : Promise<void> { /** Promise since the function is async */
        // if the function is called from a form, we prevent the default behaviour
        // which is to reload the page with the form data
        if (event) event.preventDefault();

        try {
            const data = await getActors(backend, {limit, offset, 'order-dir' : orderDir, 'order-by' : orderBy} as PaginationQuery);
            setActors(data);
        } catch (err : any) {
            if (err['error-message']) {
                const message = err['error-message'];
                alert(message);
            }
        }
    }

    /**
     * useEffect hook, this will recall retrieveActors when the backend, limit or offset changes
     * - This makes our frontend reactive to changes
     */
    useEffect(() => {
        retrieveActors();
    }, [backend, limit, offset])

    /**
     * These are the props we pass to the pagination component
     * 
     * Notice that we pass the states and the setters of them. Since the states
     * are in the current component, a change in the state will trigger a re-render
     * So this component will be re-rendered when the states change.
	 * 
	 * Since in our `useEffect` here above watches for changes in any of the states
	 * passed down to the pagination component, it will call the `retrieveActor` function
	 * on every change of the states, which will trigger a re-render of this component
     * 
     */
    const paginationProps = {
        limit,
        offset,
        setOffset,
        setLimit,
        setOrderDir,
        setOrderBy,
        orderByList : ['id', 'first_name', 'last_name', 'last_update'],
    }

    return (
        <div>
            {/* 
                We use a form to handle the submit event
                - When the form is submitted, the function retrieveActors is called
            */}
            <form onSubmit={retrieveActors}>
                {/* Here we add the pagination component
                    - We pass the paginationProps as props to the component
                    theses states are used to handle the pagination
                */}
                <Pagination {...paginationProps} />
                <button type="submit">Find</button>
            </form>
        </div>
    )
}

export {
    ActorsForm
};