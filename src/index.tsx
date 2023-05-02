import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store, persistor} from './store';
import './style/style.scss'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, HashRouter } from 'react-router-dom';

// const store = setupStore()
const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate> 
      </Provider>
      </DndProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
