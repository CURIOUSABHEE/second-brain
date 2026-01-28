import React from "react";
import SidebarItem from "./SidebarItem";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import Logo from "../../icons/Logo";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white shadow-lg shadow-purple-500/50 w-72 fixed left-0 top-0">
      <h1 className="flex mt-4 mb-4 ml-8 font-bold text-xl ">
        <div className="pr-2">
          <Logo />
        </div>
        Second Brain
      </h1>
      <div className="mt-2 ml-8 flex flex-col gap-2">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};

export default Sidebar;
