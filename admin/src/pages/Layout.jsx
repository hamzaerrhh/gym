import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full flex flex-col overflow-y-auto">{<Outlet />}</div>
      </div>
    </div>
  );
};
export default Layout;
