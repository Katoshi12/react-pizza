import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router";

import { store } from "./store/index.js";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
)
