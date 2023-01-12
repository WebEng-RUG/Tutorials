import { SetBackend } from "../../models";

/**
 * Global backend selection component
 * 
 * @param setBackend the setBackend prop which is passed down from the parent
 * @returns the backend selection component
 */
function BackendSelection({setBackend} : SetBackend) : JSX.Element {

    /**
     * handles the select event of the backend selection
     * 
     * @param event the event from the select element
     */
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBackend(event.target.value);
    }

    // get the list of backends, this is an environment variable reference that will be
    // substituted by nginx at runtime when running in Docker.
    let backends = "${BACKENDS}".split(",");

    // if we're not running in Docker, then read from an environment variable directly
    if(backends.length >= 1 && backends[0].startsWith("${"))
        backends = process.env.REACT_APP_BACKENDS?.split(",") ?? [];
    
    // if no backends are found in the environment variable, then use the fallback values
    if (backends.length === 0 || backends[0] === "") {
        console.error("No backends found");
        backends = [
            "http://localhost:3001",
            "http://localhost:3002"
        ]
    }
    
    const options = backends.map((backend) => <option key={backend} value={backend}>{backend}</option>);

    return (
        <div>
            <h2>Backend Selection</h2>
            <p>Choose a backend to use for this session</p>

            <select onChange={handleSelect} >
                {options}
            </select>
        </div>
    );
}


export {
    BackendSelection
};
