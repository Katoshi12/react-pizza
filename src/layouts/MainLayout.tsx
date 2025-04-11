import Header from "../components/Header.js";
import {Outlet} from "react-router";
import {FC} from "react";

const MainLayout: FC = () => {
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