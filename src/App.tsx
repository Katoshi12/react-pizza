import "./assets/scss/app.scss"
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.js";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { routes } from "./routes";

const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Routes>
      <Route path={ routes.home() } element={ <MainLayout/> }>
        <Route path="" element={ <Home/> }/>
        <Route path={ routes.cart() } element={
          <Suspense fallback={ <Loading/> }>
            <Cart/>
          </Suspense>
        }/>
        <Route path={ routes.pizza(":id") } element={
          <Suspense fallback={ <Loading/> }>
            <FullPizza/>
          </Suspense>
        }/>
        <Route path={ routes.profile() } element={
          <Suspense fallback={ <Loading/> }>
            <Profile/>
          </Suspense>
        }/>
        <Route path={ routes.notFound() } element={
          <Suspense fallback={ <Loading/> }>
            <NotFound/>
          </Suspense>
        }/>

      </Route>

    </Routes>
  )
}

export default App
