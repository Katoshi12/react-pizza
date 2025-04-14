import "./assets/scss/app.scss"
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.js";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MainLayout/> }>
        <Route path="" element={ <Home/> }/>
        <Route path="cart" element={
          <Suspense fallback={
            <Loading/>
          }>
            <Cart/>
          </Suspense>
        }/>
        <Route path="pizza/:id" element={
          <Suspense fallback={
            <Loading/>
          }>
            <FullPizza/>
          </Suspense>
        }/>
        <Route path="profile" element={
          <Suspense fallback={
            <Loading/>
          }>
            <Profile/>
          </Suspense>
        }/>
        <Route path="*" element={
          <Suspense>
            <NotFound/>
          </Suspense>
        }/>
      </Route>

    </Routes>
  )
}

export default App
