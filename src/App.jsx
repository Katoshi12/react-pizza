import "./assets/scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Route, Routes } from "react-router";


function App() {
  return (
    <div className="wrapper">
      <Header/>
      <main className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />}  />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
