/**
 * Backend model
 * The type Backend is just an alias for a string.
 * 
 * When passed as prop to a component, use this interface to define the backend
 * 
 */
type Backend = string;

/**
 * @key setBackend A function that sets the backend
 * 
 * When passing this function as prop to a component, use this interface to define the function
 */
interface SetBackend {
    setBackend : (newBackend : Backend) => void
}

export type {
    Backend,
    SetBackend
}
