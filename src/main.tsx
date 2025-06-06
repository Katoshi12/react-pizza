import {createRoot} from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router";

import {store} from "./store";
import {Provider} from "react-redux";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  )
}


