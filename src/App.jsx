import "./assets/scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Route, Routes } from "react-router";
import Cart from "./pages/Cart.jsx";
import { createContext, useState } from "react";

export const SearchContext = createContext()

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={ {searchQuery, setSearchQuery} }>
        <Header/>
        <main className="content">
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/cart" element={ <Cart/> }/>
            <Route path="*" element={ <NotFound/> }/>
          </Routes>
        </main>
      </SearchContext.Provider>
    </div>
  )
}

export default App
