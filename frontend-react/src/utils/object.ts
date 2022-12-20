/**
 * Turns an object array into a string of a given key 
 * 
 * @param objArray the object array to convert to a list
 * @param key the key of the object to use as the list values
 * @returns the list of values as a string (comma separated, with a space)
 */
function objectToList<T extends Object>(objArray : T[], key : keyof T) : string {
    let list : string[] = [];
    objArray.forEach((obj : T) => {
        if (obj.hasOwnProperty(key)) {
            list.push(obj[key] as string);
        }
    });
    return list.join(', ');
}

export {
    objectToList
}