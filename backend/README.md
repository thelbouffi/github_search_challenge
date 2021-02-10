## Prerequisites

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
- **POST** http://0.0.0.0:3001/api/search/  
- **GET** http://0.0.0.0:3001/api/clear-cache  
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
- The `./src/controllers` constains config object for managing:
  - route files paths
  - redis
  - server host and port
- The `./src/interfaces` contains typescript interfaces
- The `./src/jsonSchemas` contains request body json schema

## Routes calls
### POST http://localhost:3001/api/search/
- If we make a post request to the server, with new query that is not saved on redis it will trigger the call of the following controllers:
- validateBody: calls ajv, validate the schema if it's correct, if yes it returns next(), to got to the next controller. and if any error is cateched then we stop the request and return the error
- redisSearch: check if the request have been already made and still exist on the memory, if yes it responds the results to the user and finish the request, else it goes to the next middlware, and if any error hapend then we cached it and stop the request
- restSearch: it call octokit to make a restful call to github api then calls next if no error is catched
- cacheSave: if the result obtained from github comes with status 200, the result is saved on redis memory, unless some unexpected error hapened then the error is catched
- sendResults: finally we resond with the result that was obtained from github, unless some error hapend that will be also handled
- Note that:
  - The results comes paginated from github depending on the query string that we pass on our request
  - Calling the the request for a second time takes less amount of time than in the firest time, thanks to redis, from wehre we take our result and not from github
  - The cached result expires after 2 hours

### GET http://localhost:3001/api/clear-cache  
- When calling this end point we will call a controller that calls redis command that flush the database

## Next Steps
- Add github access token to be authenticated and be able to have right of 5000 requests per hour available. For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.
- Add Swagger documentation
- Add api test using Supertest



 
