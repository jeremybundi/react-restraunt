// src/store/store.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// Initial state
const initialState = {
  token: null,
  name: null,
  role: null,
};

// Actions
const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

// Action creators
export const setAuth = (authData) => ({
  type: SET_AUTH,
  payload: authData,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

// Persist configuration
const persistConfig = {
  key: 'auth', // Key for the persisted state
  storage,     // Storage type (localStorage in this case)
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        role: action.payload.role,
      };
    case CLEAR_AUTH:
      return {
        ...state,
        token: null,
        name: null,
        role: null,
      };
    default:
      return state;
  }
};

// Create persist reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create store
const store = createStore(persistedReducer);

// Create persistor
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
