import { Outlet } from "react-router-dom";
import { Header } from "./adminHeader";

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
