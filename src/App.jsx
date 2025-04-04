import "./assets/scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Route, Routes } from "react-router";
import Cart from "./pages/Cart.jsx";
import { useState } from "react";
import Pagination from "./components/Pagination/index.jsx";

function App() {
  const [searchQuery, setSearchQuery ] = useState("");


  return (
    <div className="wrapper">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="content">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />}  />
          </Routes>
      </main>
    </div>
  )
}

export default App
