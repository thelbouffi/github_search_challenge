# Introdction
A full demo of the devloped application is in this video: https://youtu.be/0vZEqf9rSss

# Backend
## Backend Prerequisites

- [Node js](https://nodejs.org/en/)
- [NPM](https://nodejs.org/) or [Yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/download)
## Start the Backend App in Development Mode

- Make sure that redis is installed an its service is up and runing
```bash
redis-cli ping
```

- Install dependencies by running the following command on your terminal

```bash
npm i #or yarn install
```

- Start your dev server by running:

```bash
npm run dev #or yarn run dev
```

## Build TypeScript Code
In order to compile `typescript` code, and generate the javascript code, you need to run this command:

```bash
npm run build #or yarn run build
```

After building the project, you can start the project by either running this command:

```bash
npm start #or yarn start
```

## Endpoints
- **POST** http://localhost:3001/api/search/  
- **GET** http://localhost:3001/api/clear-cache  
with the folowing body attributes:
  - **type** that accept only two values: *Users* for searching for users or *Repositories* for searching for repositories
  - **queryBody** that accept any string value
````
{
    "queryBody": "thelbouffi",
    "type": "Users"
}
````
and the following query strings `per_page` (by default `10`) and `page`  (by default 1)
````
http://0.0.0.0:3001/api/search?per_page=10&page=1
````

## Main Used Node Packages Modules
- **Express**: a minimal server framework for creating our server and handling our routes
- **Redis**: a nodejs redis library that maps to Redis commands
- **@octokit/rest**:  GitHub REST API client for JavaScript
- **Ajv**: json schema validator
- **body-parser**: middleware for parsing the request body
- **eslint**: for ECMAScript linting for catching bugs
- **prettier**: for code formatting
- **typescript**: for supporting typescript on our code

## Backend Structure Description
- The entry point of our backend `./src/index.ts`, it calls the function `start()` that launch a server that listen by default on port `3001`
- The `start()` function constained on `./src/lib/express.lib.ts` loads redis and instansiate an express server with bodyParser middelwares and routes
- Next to `./src/lib/express.lib.ts`, we have `./src/lib/dotenv.lib.ts` for managing environments and `./src/lib/redis.lib.ts` for creating a redis client that communicates with redis
- The `./src/routes` folder is made in a way to contain multiple routes files. When the start() function is called, it will loop over them to load  all our server routes. For our case, we only have one route file which is `./src/routes/github.routes.ts`. In this file we define:
  - a prefix `/api` for our end points
  - HTTP methods and controllers associated to each end point
  - whenever we call a route it will look on the array of handlers(controlers) associated to it, to call them one after the other
- The `./src/controllers` folder contains controllers files used by our routes, for our case we have only one controller file which is `./src/controllers/github.controllers.ts`
- The `./src/config` constains config object for managing:
  - route files paths
  - redis
  - server host and port
- The `./src/interfaces` contains typescript interfaces
- The `./src/jsonSchemas` contains request body json schema

## Routes calls
### POST http://localhost:3001/api/search/
- If we make a post request to the server, with new query that is not saved on redis it will trigger the call of the following controllers:
- validateBody: calls ajv, validate the schema if it's correct, if yes it returns next(), to got to the next controller. And if any error is cateched then we stop the request and return the error
- redisSearch: check if the request have been already made and still exist on the cache memory, if yes it responds the results to the user and finish the request, else it goes to the next middlware, and if any error hapend then we cached it and stop the request
- restSearch: it call octokit to make a restful call to github api then calls next if no error is catched
- cacheSave: if the result obtained from github comes with status 200, the result is saved on redis memory, unless some unexpected error hapened then the error is catched
- sendResults: finally we resond with the result that was obtained from github, unless some error hapend that will be also handled
- Note that:
  - The results comes paginated from github depending on the query string that we pass on our request
  - Calling the the request for a second time takes less amount of time than in the firest time, thanks to redis, from wehre we take our result and not from github
  - The cached result expires after 2 hours

### GET http://localhost:3001/api/clear-cache  
- When calling this end point we will call a controller that calls redis command that flush the database

## Backend Next Steps
- Add github access token to be authenticated and to be able to have right of 5000 requests per hour available. For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.
- Add Swagger documentation
- Add api test using Supertest

# Frontend
## Start the Front App in Development Mode
- Install the dependencies
```bash
yarn install
```
- Start in development mode
```bash
yarn start
```
## Frontend Structure
- The front was created using `create-react-app` module
- `./src/index.ts` is the main entry point of our application, it calls :
  - the main component `<App/>` 
  - with `<PersistGate/>` that delays the rendering of our app's UI until the persisted state is retrieved and saved to redux.
  - and also `<Provider>` that makes the Redux store available to all components under `<App>`
- `./src/App.ts` is the main component of our application. It's composed by `<Router>` and `<Switch>` tags that surround the other main components. In this component we are also defining the routes related to each component
- `./src/pages` folder contains the main components (pages) that will be called by our defined routes. For our case we have 3 main pages (3 main components):
  - `./src/pages/Search.tsx` is a functional compnent responsible for displaying the main page containig only the input field and dropdown menu.
  - `./src/pages/Users.tsx` is a functional component responsible for displayin the results of users search and it's related to the route `/users`
  - `./src/pages/Repos.tsx` is a functional component responsible for displayin the results of repositories search and it's related to the route `/repos`
- `./src/components` folder contains the smaller components that will constitute the pages (main components). we have 4 components
  - `./src/components/SearchFields` is a component responsible for displaying the input and dropdown menu. It's also composed by other sub components that are ghathred to constitite the dropdown menu
  - `./src/components/UserDetails` is a component responsible for displaying a card that holds one user details
  - `./src/components/ReporDetails` is a component responsible for displaying a card that holds one repository details
  - `./src/components/Alert` is a component responsible for displaying modal when an error is catched
- `./src/redux` this folder contains all the logic behind implementing redux on our application. It contains :
  - all the actions that are called to be dispatched
  - all reducers combined
  - the global redux store with its configuration
- `./src/interfaces` used for managing types and interfaces

## Logic implemented
### case of clicking the drop down menu only
- In this case the page `./src/pages/Search.tsx` is called, and thereafter it will show `<SearchFields />` component. This component contains the input field and the dropdown menu, that `<DropDown/>` is composed by 3 subcomponent `<Toggle/>`, `<List/>` and `<Item/>`
-  The `<Toggle/>` component when it's clicked, it dispatchs an action that change a boolean state attribute in the redux sotre related to the `<List/>` component. When it's true `<List/>` component is diplayed else it's hiden
- `<List/>` component wraps `<Item/>` component. Items to list in our list of items is determined by porps passed from `<DropDown/>` component
- When we click `<Item/>` component it dispatch an action that tells the `<List/>` component to desapear, and save in our store the name of choosen dropdown item  
- we use svg to drow up and down arrows
### case of filling the input field
- when we start filling the input field, if we insert 3 or more characters we dispatch an action that calls axios. We have also a use effect that help us make a history push to the respictive route.
- in case of removing characters until length is less than 3, we should be redirected to search page thanks to useEffect
### when dispatch is called
- when we call dispatch it will call an action fucntion that returns type (action type) and payload
- in parallel we have reducer that listen for spesific action type. case of specific action we update the shared state
### when we dispatch an asynchronous function
- in case of calling asynchronous function like post request, we will need a library like redux thunk that let us do that
- the redux thunk is callled as appliyed middleware when creating the store
### in case of error
- each time we dispatch an asynchronoous action it will check if data is loaded without errors. In case of errors, we display a modal that show this error

## Frontend Next steps 
- work on styling and animation
- fix debounce with dispatch
- fetch addtional users details
- enhence error handling
- improve code reusability



 
