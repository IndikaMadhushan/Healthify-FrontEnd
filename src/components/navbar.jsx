import { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./Buttons/loginButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <div className="w-full h-[80px] bg-white flex items-center px-4 md:px-6 lg:px-10 xl:px-0">

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[160px] h-[86px] ml-0 xl:ml-[205px]"
        />

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex w-full h-full gap-[50px] items-center justify-center text-[18px]">
          <Link to="/home" className="text-mainblack hover:text-secondary/75">Home</Link>
          <Link to="/about" className="text-mainblack hover:text-secondary/75">About</Link>
          <Link to="/works" className="text-mainblack hover:text-secondary/75">How It Works</Link>
          <Link to="/contacts" className="text-mainblack hover:text-secondary/75">Contact Us</Link>
        </div>

        {/* DESKTOP LOGIN BUTTON */}
        <div className="hidden xl:block">
          <LoginButton />
        </div>

        {/* MOBILE HAMBURGER / CROSS */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden ml-auto bg-transparent"
        >
          <img
            src={open ? "/cross.png" : "/hamburger.png"}
            className="w-7 h-7 object-contain"
          />
        </button>
      </div>

      {/* MOBILE SLIDE MENU */}
      <div
        className={`
          fixed top-[80px] right-0 w-[250px] bg-white shadow-lg 
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col text-[18px] p-6 space-y-5">

          <Link onClick={() => setOpen(false)} to="/home" className="hover:text-secondary/75">Home</Link>
          <Link onClick={() => setOpen(false)} to="/about" className="hover:text-secondary/75">About</Link>
          <Link onClick={() => setOpen(false)} to="/works" className="hover:text-secondary/75">How It Works</Link>
          <Link onClick={() => setOpen(false)} to="/contacts" className="hover:text-secondary/75">Contact Us</Link>

          <LoginButton />
        </div>
      </div>
    </>
  );
}
