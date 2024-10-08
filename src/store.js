// src/store.js
import { createStore } from 'redux';

// Define the initial state
const initialState = {
    token: null,
    name: null,
    role: null,
};

// Create a reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                name: action.payload.name,
                role: action.payload.role,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

// Create a Redux store
const store = createStore(authReducer);

export default store;
