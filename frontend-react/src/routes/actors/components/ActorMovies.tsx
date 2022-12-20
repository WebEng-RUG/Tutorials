import { useContext, useEffect, useState } from "react";
import  { FormEvent } from "react";

import { useParams } from "react-router-dom";
// we have to import the MovieSummary type as a different name since we have a component with the same name
import {  PaginationQuery, MovieSummary as MovieSummaryType } from "../../../models";
import { getActorMovies } from "../../../api";
import { BackendContext } from "../../BackendContext";
import { ActorId } from "../Actor";
// the component with the same name referred to 
import { MovieSummary } from "../../movies/components";
import { Pagination } from "../../components/Pagination";

/**
 * The movies result component
 * 
 * @returns a div containing the list of movies made into a JSX.Elements
 */
function ActorMovies() {
	// we need the backend url in this component, so we use the context
	// to get the value from the specific context we created and then import
	const backend = useContext(BackendContext);

	// get the id from the url aka the path variable
	// the field id is the name of the path variable, so it has to be the same
	// as the name of the path variable in the router
	// See App.tsx ` <Route path="/actors/:id/movies" element={<ActorMovies />} /> `
	const { id } = useParams<ActorId>();

	const [movies, setMovies] = useState<MovieSummaryType[]>();

	// we need a state to store the loading state, which is an indicator
	// that the data is being fetched
	const [loading, setLoading] = useState(false);


	// we need a state to store the limit
	const [limit, setLimit] = useState(10);
	// we need a state to store the offset
	const [offset, setOffset] = useState(0);


	const [orderDir, setOrderDir] = useState('asc');
	const [orderBy, setOrderBy] = useState('title');
		

	/** Promise since the function is async */
	async function retrieveActor(event? : FormEvent<HTMLFormElement>) : Promise<void> {
		if (event) {
			event.preventDefault();
		}

		setLoading(true);
		
		try {
			const data : MovieSummaryType[] = await getActorMovies(backend, id, {'order-by' : orderBy, 'order-dir' : orderDir, limit, offset} as PaginationQuery)
			setMovies(data);
		} catch (error) {
			console.error(error);
		}

		setLoading(false);
	}

	/**
	 * This hook ensures that the actor is retrieved when the backend changes
	 *  - we need to add the backend to the dependency array so that the hook
	 *   is called when the backend changes, in this case we only want to call
	 *   the `retrieveActor` function when the backend changes
	 */
	useEffect(() => {
			retrieveActor();
	}, [backend, orderBy, orderDir, limit, offset]);

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
			setOffset,
			setLimit,
			setOrderDir,
			setOrderBy,
			limit,
			offset,
			orderByList: ['Title', 'Year', 'Rating'],
	}

	return (
		<div>
		{
			movies ?
			// the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
			<>
			<Pagination {...paginationProps} />
			<MovieSummary movies={movies} loading={loading} />
			</>
			: 
			<p>No Movies Found</p>
		}
		</div>
	);
}

export {
		ActorMovies
};