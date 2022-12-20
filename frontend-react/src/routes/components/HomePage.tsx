import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>
                This is the home page. You can navigate to the movies and actors
                pages from here.
            </p>
            {/* we use the Link from react-router-dom, because it is faster than regular <a> (anchor tag) */}
            <Link to="/movies"> Movies </Link>
            <br />
            <Link to="/actors"> Actors </Link>

            <p>
                Welcome to the react front-end for the movies API. This is a
                simple example of a react front-end that uses the movies API. 
                Notice that I did not use any CSS (framework). I just used plain
                REACT code, since that is the core of this tutorial.
                <br/>
                However you can use any CSS framework you want, like react-bootstrap, material-ui, etc.
                You can also use plain CSS if you want. But that becomes quite cumbersome with a large react app.
                <br/>
                I recommend to either use material-ui or react-bootstrap. They are both very easy to use and have what is known
                as a "mobile first" approach. This means that the CSS is optimized for mobile devices first, and then
                for desktop devices. This is a very good approach, since most people use their mobile devices to browse the web.
                <br/>
                Additionally, they give you access to "styled components". This means that you can use the component in your
                code and it will be style automatically. Of course you can override the styles if you want and change them to suite your needs.
                <br/>

                Before you start, I recommend that you read the README.md file in the root of this project. It contains
                some important information about the project. 
                <br/>
            </p>
        </div>
    );
}

export {
    HomePage
}