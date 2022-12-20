import { Actor, Movie } from "../models";
import { Review } from "../models";


/**
 * Converts a string to an integer
 * if the string is empty, it returns 1
 * 
 * @param str the string to convert
 * @returns the integer value of the string
 */
function toInt(str : string) : number {
    if (str === '') {
        return 1;
    }
    return parseInt(str);
}

/**
 * Initializes a review from a form data
 * 
 * @param formData the form data to initialize the review from
 * @returns the review
 */
function reviewFromFormData(formData : FormData) : Review {
    const user = toInt(formData.get('review_user') as string);
    const usercount = toInt(formData.get('review_usercount') as string);
    const metascore = toInt(formData.get('review_metascore') as string);

    return {
        user,
        usercount,
        metascore
    };
}

function getFormValues(formData : FormData) : Movie {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const year = parseInt(formData.get('year') as string);
    const rating = formData.get('rating') as string;
    const imdb_url = formData.get('imdb_url') as string;
    
    let actors = formData.get('actors') as string;
    let languages = formData.get('languages') as string;
    let actorsIds = formData.get('actors-ids') as string;

    // actors and languages are comma separated values
    // so we need to split them into an array
    const actorsArray = actors.split(',');
    const actorsIdsArray = actorsIds && actorsIds.split(',');
    const languagesArray = languages.split(',');

    // trim the values of the array
    // to remove the extra spaces
    for (let i = 0; i < actorsArray.length; i++) {
        actorsArray[i] = actorsArray[i].trim();
    }
    for (let i = 0; i < languagesArray.length; i++) {
        languagesArray[i] = languagesArray[i].trim();
    }
    

    // we need to create an array of actors
    // with the id and name of each actor
    const actorsObjectArray : Actor[] = [];
    for (let i = 0; i < actorsArray.length; i++) {
        const actor : Actor = {
            name: actorsArray[i]
        }
        // only if the id's are present
        // we need to parse them to int
        if (actorsIdsArray && actorsIdsArray[i]) {
            actor.id = parseInt(actorsIdsArray[i]);
        }
        actorsObjectArray.push(actor);
    }

    const review = reviewFromFormData(formData);

    const body : Movie = {
        title: title,
        description: description,
        year: year,
        rating: rating,
        review,
        languages : languagesArray,
        actors : actorsObjectArray,
        imdb_url
    }

    return body;
}


export {
    getFormValues
}