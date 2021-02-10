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
  - and also `<Provider>` that makes the Redux store available to all component under `<App>`
- `./src/App.ts` is the main component of our application. It's composed by <Router> and <Switch> tags that surround ther other main components. In this component we are defining the routes related to each component
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
- In this case the page `./src/pages/Search.tsx` is called, and thereafter it will `<SearchFields />` component. This component contains the input field and the dropdown menu that `<DropDown/>` is composed by 3 subcomponent `<Toggle/>`, `<List/>` and `<Item/>`
-  The `<Toggle/>` component when it's clicked, it dispatchs an action that change a boolean state attribute in the redux sotre related to the `<List/>` component. When it's true `<List/>` component is diplayed else it's hiden
- `<List/>` component wraps `<Item/>` component. Items to list in our list of items is determined by porps passed from `<DropDown/>` component
- `<Item/>` component it dispatch an action that tells the `<List/>` component to desapear, and save in our store the name of choosen dropdown item  
- we use svg to drow up and down arrows
### case of filling the input field
- when we start filling the input field, if we insert 3 or more characters we dispatch an action the calls an axios fetch. We have also a use effect that help us make a history push to the respictive route.
- in case of removing characters until length is less than 3, we should be redirected thanks to useEffect
### when dispatch is called
- when we call dispatch it will call an action fucntion that returns type (action type) and payload
- in parallel we have reducer that listen for spesific action type. case of specific action we update the shared state
### when we dispatch an asynchronous function
- in case of calling asynchronous function like post request, we will need a library like redux thunk that let us do that
- the redux thunk is callled as appliyed middleware when creating the store
### in case of error
- each time we dispatch an asynchronoous action it will check if data is loaded without errors. In case of errors, we display a modal that show this error

## Next steps 
- work on styling and animation
- fix debounce with dispatch



