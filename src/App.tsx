import "./assets/scss/app.scss"
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import {Route, Routes} from "react-router";
import Cart from "./pages/Cart.js";
import FullPizza from "./pages/FullPizza.js";
import MainLayout from "./layouts/MainLayout.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainLayout/> }>
        <Route path="" element={ <Home/> }/>
        <Route path="cart" element={ <Cart/> }/>
        <Route path="pizza/:id" element={ <FullPizza/> }/>
        <Route path="*" element={ <NotFound/> }/>
      </Route>

    </Routes>
  )
}

export default App
