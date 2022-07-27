import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from './redux/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

// GA 트래킹 관련 동작
import ReactGA from "react-ga4";
import { GATrackingId } from './shared/global_variables'
ReactGA.initialize(GATrackingId);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
