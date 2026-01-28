import React, { type ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div className=" flex items-center pl-4 text-gray-800 cursor-pointer hover:bg-gray-300 max-w-48 rounded-2xl transition-all duration-1000">
      <div className="p-2">{props.icon}</div>
      <div className="p-2">{props.text}</div>
    </div>
  );
};

export default SidebarItem;
