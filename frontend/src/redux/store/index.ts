import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from '../reducers';

// configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage, // define which storage to use
};

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer); 

// create a store with persisted reducer and apply of middlware containing thunk  
// composeWithDevTools will be deleted in case of production
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// used to create the persisted store, persistor will be used in the next step
const persistor = persistStore(store); 

export { store, persistor };
