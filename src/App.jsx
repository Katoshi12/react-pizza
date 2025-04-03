import "./assets/scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Route, Routes } from "react-router";
import Cart from "./pages/Cart.jsx";


function App() {
  return (
    <div className="wrapper">
      <Header/>
      <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />}  />
          </Routes>
      </main>
    </div>
  )
}

export default App
