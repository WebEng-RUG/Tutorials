# frontend-vue

This is an implementation of the Movies API frontend built in Vue.js, using the API as specified in `../specification/spec.yml`.

## Packages used:

### Vue:

> Vue (pronounced /vjuː/, like **view**) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.
>
> Source: https://vuejs.org/guide/introduction.html

[Documentation](https://vuejs.org/)

## Vite

> Vite is a build tool created by Evan You, the creator of Vue. It allows for faster development thanks to super fast Hot Module Reload (HMR), fast cold start times, and CSS + JSX + TypeScript support out of the box.

Vue CLI can be used instead, but Vite is much faster, so hot reloading is quicker. In the Vue docs they have also shifted to using Vite instead of Vue CLI. The command shown below for creating a vue application uses Vite. [Documentation](https://vitejs.dev/)

### Pinia

Pinia is a store library that is used to manage state across all pages of your application. Replaced Vuex for state management recently. [Documentation](https://pinia.vuejs.org/)

### Vue Router

This is used to provide routing for our Single page application.

[Documentation](https://router.vuejs.org/)

### Axios

Http client used in this application for making api requests. Standard `fetch()` can be used instead, however axios requires less configuration to make a request. `fetch()` makes use of the request body to add request parameters, whereas axios will jsonify your request parameters.

[Documentation](https://axios-http.com/docs/intro)

```terminal
npm install axios
```

## Creating a new vue application:

To create a vue application, an npm tool is used which allows you to choose which packages you want out of the box. To create the app, run the following command:

```terminal
npm init vue@latest
```

You will then need to select which packages you want. My preferences are shown below:

```terminal
Vue.js - The Progressive JavaScript Framework

√ Project name: ... my-vue-project
√ Add TypeScript? ... Yes
√ Add JSX Support? ... No
√ Add Vue Router for Single Page Application development? ... Yes
√ Add Pinia for state management? ... Yes
√ Add Vitest for Unit Testing? ... No
√ Add an End-to-End Testing Solution? » No
√ Add ESLint for code quality? ... No

Scaffolding project in C:\Users\andre\Documents\deleteme...

Done. Now run:

  cd my-vue-project
  npm install
  npm run dev
```

## The File structure:

This will produce a directory structure (I have left the important files only):

```terminal
│   index.html
│   package.json
│   README.md
│   tsconfig.config.json
│   tsconfig.json
│   vite.config.ts
├───public
│       favicon.ico
└───src
    │   App.vue
    │   main.ts
    ├───assets
    ├───components
    ├───router
    │       index.ts
    ├───stores
    └───views
```

## Useful tricks

### Addressing all source files with `@` as alias for `./src`

In the `tsconfig.json` file I have defined an alias for `./src` folder, so this is what allows me to address all components and other files within the vue source directory using `@`. You can see this on all of the imports throughout the project.
