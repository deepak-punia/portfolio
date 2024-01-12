import React from "react";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import MenuItems from "./MenuItems";

const Menu = () => {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 opacity-95 hidden md:block">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3 md:py-0">
          <div className="w-16">
            <Logo />
          </div>
          <MenuItems />
        </div>
      </nav>
      <MobileMenu />
    </>
  );
};

export default Menu;
