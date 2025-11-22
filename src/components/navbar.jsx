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
        <div className="hidden xl:flex w-full h-full text-sm text-accent bg-white gap-[50px] items-center justify-center text-[18px]">
          <Link to="/home" className="text-mainblack hover:text-secondary/75">Home</Link>
          <Link to="/products" className="text-mainblack hover:text-secondary/75">Products</Link>
          <Link to="/about" className="text-mainblack hover:text-secondary/75">About</Link>
          <Link to="/contacts" className="text-mainblack hover:text-secondary/75">Contacts</Link>
        </div>

        {/* DESKTOP LOGIN BUTTON */}
        <div className="hidden xl:block">
          <LoginButton />
        </div>

        {/* MOBILE + TABLET HAMBURGER / CROSS */}
        <button
          className="xl:hidden ml-auto bg-transparent"
          onClick={() => setOpen(!open)}
        >
          <img
            src={open ? "/cross.png" : "/hamburger.png"}
            alt="Menu"
            className="w-7 h-7 object-contain"
          />
        </button>
      </div>

      {/* MOBILE SLIDE MENU (from RIGHT) */}
    <div
      className={`xl:hidden absolute top-[80px] right-0 w-[250px] bg-white shadow-lg transform transition-transform duration-300 ${
       open ? "translate-x-0" : "translate-x-full"
      }`}
>
      <div className="flex flex-col text-accent text-base p-6 space-y-5 text-[18px]">

        <Link onClick={() => setOpen(false)} to="/home" className="text-mainblack hover:text-secondary/75">
          Home
        </Link>
        <Link onClick={() => setOpen(false)} to="/products" className="text-mainblack hover:text-secondary/75">
          Products
        </Link>
        <Link onClick={() => setOpen(false)} to="/about" className="text-mainblack hover:text-secondary/75">
          About
        </Link>
        <Link onClick={() => setOpen(false)} to="/contacts" className="text-mainblack hover:text-secondary/75">
          Contacts
        </Link>

        {/* MOBILE LOGIN BUTTON */}
        <LoginButton />
      </div>
    </div>
      
     
    </>
  );
}
