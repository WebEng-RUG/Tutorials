import serverPreference from "../storage/server-preference.js";

/**
 * Makes an API call to the given URL with the stored server preference
 * @param {string} url 
 * @param {string} method
 * @param {object} data
 * @returns {Promise<Response>}
 */
export default async function apiCall(url, method = "GET", data = null) {
    // We obtain the server preference from the state storage (implemented using
    // localstorage APIs in this case)
    const server = serverPreference.getSelectedServer();
    if(server == null)
        throw new Error("No server preference set!");

    // Construct URL
    url = `http://${server}/${url}`;

    // Set options
    /** @type {RequestInit} */
    const requestConfig = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Set data: in this case we want to send the request data as
    // URL parameters for GET/HEAD/DELETE requests and only as request body
    // for other requests. This is possible since our specification is compatible
    // with this assumption. Other APIs might actually need both body and URL
    // parameters.
    if(data != null) {
        if(method === "GET" || method === "HEAD" || method === "DELETE") {
            // Use as parameter data
            url += "?" + new URLSearchParams(data).toString();
        } else {
            // Use as body data
            requestConfig.body = JSON.stringify(data);
        }
    }

    // Await the result: any errors will the thrown
    return await fetch(url, requestConfig);
}