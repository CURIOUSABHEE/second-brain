import { type ReactElement } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
  active?: boolean;
}

const SidebarItem = ({ icon, text, onClick, active }: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center pl-4 text-gray-800 cursor-pointer hover:bg-gray-200 max-w-48 rounded-2xl transition-all duration-200 ${active ? "bg-gray-200 font-medium" : ""}`}
      onClick={onClick}
    >
      <div className="p-2">{icon}</div>
      <div className="p-2">{text}</div>
    </div>
  );
};

export default SidebarItem;
