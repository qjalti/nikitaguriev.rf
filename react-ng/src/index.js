import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {createRoot} from 'react-dom/client';

import {HelmetProvider} from 'react-helmet-async';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <HelmetProvider>
      <App/>
    </HelmetProvider>,
);

/* if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
  });
}*/


/* ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
