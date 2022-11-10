import React from "react";
import Logo from "../assets/channy-logo.png";

const Header = () => {
  return (
    <header className="bg-[#f4efc0] sticky top-0 left-0 px-8 py-4 w-full shadow-lg flex items-center justify-center">
      <img src={Logo} alt="logo" className="w-80 shadow-xs" />
    </header>
  );
};

export default Header;
