import React from 'react';
import { BsFillGridFill, BsClipboardData, BsPeople, BsBuilding, BsPersonFill, BsBoxArrowRight } from 'react-icons/bs';
import SideBarContents from './SideBarContents';
import 'bootstrap/dist/css/bootstrap.min.css';
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">

      {/* <--- SideBar Icons and Text ---> */}
      <SideBarContents to="/" Icon={BsFillGridFill} text="Dashboard" />
      <SideBarContents to="/attendance" Icon={BsClipboardData} text="Attendance" />
      <SideBarContents to="/users" Icon={BsPeople} text="Users" />
      <SideBarContents to="/subunits" Icon={BsBuilding} text="Sub-Units" />
      <SideBarContents to="/profiles" Icon={BsPersonFill} text="Profiles" />

      {/* <--- Logout Button ---> */}
      <SideBarContents to="/logout" Icon={BsBoxArrowRight} text="Log-out" />
    </div>
  );
};

export default Sidebar;
