This the react app front-end for our movies api that we already built.

To build this app, we are going to use the following technologies:

1. React (with typescript)
   Why typescript? Typescript is a superset of javascript that adds static typing to javascript. This makes it easier to write code that is less prone to errors. Additionally it allows us to define the expected types of our functions and variables, which makes it easier to understand the code and makes runtime errors less likely since we know the types of our variables and functions.

2. axios (for making api calls)
   why axios? Advantages of using Axios over the native Fetch API include:
    - Automatic transforms for JSON data
    - Clearer syntax for making requests
    - Setting global defaults for requests
  
I built this app using the node version 18.12.1 which the latest lts version of node at the time of writing this. You can download node from here: https://nodejs.org/en/download/

It is highly advisable that you use a node version manager like nvm to manage your node versions. Look up how to install nvm for your operating system.

Using nvm, you can install the latest lts version of node by running the following command:

> nvm install 18.12.1

Or because I have a .nvmrc file in the root of this project, you can just run the following command:

> nvm install 

This will install the node version specified in the .nvmrc file.

After installing node, you can run the following command to install the dependencies for this project:

> nvm use 

To use the node version specified in the .nvmrc file.

After that run :

> npm install

This will install all the dependencies for this project.


If you want to run this app without docker, you can run the following command to start the app:

> npm run dev

This will start the app in development mode. Open http://localhost:3000 to view it in the browser.

# Core concepts of react 

## What is react?

React is a JavaScript library for building user interfaces. It is declarative, which means that we can build complex UIs from small and isolated pieces of code called components. It is important to note that React needs Javascript to be enabled in the browser. This is because React runs completely on the client side using the browser's Javascript engine. So if you want to use React, you need to enable Javascript in the browser.

Why do we see that we need to enable Javascript and not Typescript when we are clearly using Typescript ?
- Typescript  is not executed directly, it is first "transpiled" in other words Typescript is compiled to Javascript since the browser does not "understand" Typescript but only Javascript.

What happens when we visit / view a react app in the browser ?
- When we visit a react app in the browser, the browser downloads the react app's code and then runs it in the browser.

How does react know where to start rendering the app ?
- React uses the index.html file to know where to start rendering the app. The index.html file is the entry point of the react app. It is the first file that is loaded when we visit the react app in the browser. The index.html file contains a div element with an id of root (in a standard react app). The react app then grabs the div with the id of root and renders the app inside of it.

## Component

React components are the building blocks of a React application's UI.

A component or a JSX component / element is a small, reusable chunk of code that is responsible for one job. It accepts input and returns a React element describing what should appear on the screen. We describe that using JSX. JSX/TSX is a syntax extension to JavaScript / Typescript. However, TSX/JSX code allows us to write HTML code inside our Javascript or Typescript code. This allows us to write dynamic and reusable UIs.
When writing JSX components your file must have a .jsx extension. But in our case we are using typescript so we use the .tsx extension. The return type of the functional component is still JSX.Element though.

We can nest components within other components, which allows us to compose complex UIs from many small and isolated pieces of code. We can also reuse components across our application. 

This app is built using functional components. Functional components are just functions that accept props as an argument and return a React element. It is important to note that every 
functional component must return a single React element. However, if you want to return multiple elements, you can wrap them in a React fragment. A React fragment is a special syntax that allows us to group a list of children without adding extra nodes to the DOM. Or you can use a div element to wrap the elements.

Every react component has what is known as a lifecycle. The lifecycle is a set of methods that are called at different stages of the component's existence. We can describe such a life cycle in phases:

1. Initial phase
2. Mounting phase
3. Updating phase
4. Unmounting phase

To read more about the component lifecycle, check out this [link](https://reactjs.org/docs/state-and-lifecycle.html).
More about the phases can be found [here](https://www.javatpoint.com/react-component-life-cycle)

## Props

Props or properties are used to pass data from one component to another. Props are immutable, which means that we cannot directly change the props. We can only change the props by passing different values. We pass props to a component by using the props attribute. Props is an object that contains all the attributes that we pass to a component. Generally, you destruct the props object to get the attributes that you need immediately in the function body (examples of this can be seen in the code). 

Additionally, because we are using typescript we have to define an interface (or a type) for the props that we are passing to a component. This is because typescript is a statically typed language. This means that we have to define the types of our variables and functions. This is done using interfaces and types. 

What is the difference between an interface and a type in TypeScript ? short answer is that types are aliases for other types and interfaces are a way to describe the shape of an object. You can read more about this [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

## Hooks

Hooks are functions that let us hook into the React state and lifecycle features from function components. Hooks don't work inside classes. Hooks are a newer addition in React that were introduced in version 16.8. They let you use state and other React features without writing a class. React provides a few built-in Hooks like useState and useEffect. We can also create custom hooks. In this app, we use the useState and useEffect hooks. 

useState is a Hook that lets you add React state to function components. useState returns a pair: the current state value and a function that lets you update it. You can call this function from an event handler or somewhere else. It's similar to this.setState in a class, except it doesn't merge the old and new state together. The useState function takes one argument which is the initial state. It returns an array of two elements. The first element is the current state and the second element is a function that updates the state.

useEffect is a Hook that lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes. It is a combination of componentDidMount, componentDidUpdate, and componentWillUnmount. We can use useEffect to fetch data from an API. We can also use it to set up a subscription. We can use it to set timers. We can use it to log messages to the console. 

## React Router

React Router is a collection of navigational components that compose declaratively with your application. React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. React Router works out of the box in React Native. 

## State

The state is a built-in React object that is used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders. We use a state to store data that is going to change over time. A state is immutable, which means that we cannot directly change the state. We can only change the state by using the setState() method.

To use a state we use (as mentioned above) the useState hook. The useState hook takes one argument which is the initial state. It returns an array of two elements. The first element is the current state and the second element is a function that updates the state. Again, generally you destruct that array to get the current state and the function that updates the state immediately in the function body.

useEffect hook : useEffect is generally used to fetch data from an API as soon as the component mounts (the page loaded). It is also used to set up a subscription. That means that we can have watch for changes in one, or many states (put in a dependency array) and then do something when a state changes. If a useEffect hook has no elements in its dependency array, it will run only once.

## React context

Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context is primarily used when some data needs to be accessible by many components at different nesting levels. Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

