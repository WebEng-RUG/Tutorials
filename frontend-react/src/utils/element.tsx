// ! NOTE the .tsx extension, this is because we are using JSX

// type definition for the props of the PageWrapper component
type PageWrapperProps = {
    wrap : () => JSX.Element;
    element : () => JSX.Element;
}

/**
 * Function that wraps an element with another element,
 * this could come in handy if you do not want to wrap *all* your components
 * with a specific element, but only some of them
 * 
 * @param wrap the element that you want to wrap the other element with
 * @param element the element that you want to wrap
 * @returns the wrapped element
 */
function PageWrapper({wrap, element} : PageWrapperProps) {
    return (
        // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
        <>
            {/* as you can see the props passed are actually function and their
             * return type is the element, so you would have to call function passed 
             */}
            {wrap()} 
            {element()}
        </>
    )
}

export {
    PageWrapper
}