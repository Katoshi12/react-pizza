import Header from "../components/Header.js";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header/>
      <main className="content">
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout;