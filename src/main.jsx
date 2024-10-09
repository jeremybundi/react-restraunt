// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  
import { Provider } from 'react-redux'; // Import Provider here
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store/store'; // Import both store and persistor
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* Wrap App with Provider */}
        <PersistGate loading={null} persistor={persistor}> {/* Wrap App with PersistGate */}
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
