import { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./Buttons/loginButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <div className="w-full h-[80px] bg-white flex items-center px-4 md:px-6 lg:px-10 xl:px-0">

        {/* LOGO (kept EXACT desktop margin) */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[160px] h-[86px] ml-0 xl:ml-[205px]"
        />

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex w-full h-full text-sm text-accent bg-white gap-[50px] items-center justify-center text-[18px]">
          <Link to="/home"
            className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors "
          >Home</Link>
          <Link to="/products"
            className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors "
          >Products</Link>
          <Link to="/about"
            className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors "
          >About</Link>
          <Link to="/contacts"
            className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors "
          >Contacts</Link>
          
        </div>

        {/* DESKTOP LOGIN BUTTON */}
        <div className="hidden xl:block">
          <LoginButton />
        </div>

        {/* MOBILE + TABLET HAMBURGER */}
        <button
            className="xl:hidden ml-auto bg-transparent"
            onClick={() => setOpen(!open)}
        >
             <img 
            src="/hamburger.png" 
            alt="Menu" 
             className="w-7 h-7 object-contain" 
            />
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="xl:hidden bg-white w-full shadow-md">
          <div className="flex flex-col text-accent text-base p-4 space-y-4 text-[18px]">
            <Link onClick={() => setOpen(false)} to="/home"  className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors">Home</Link>
            <Link onClick={() => setOpen(false)} to="/products" className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors">Products</Link>
            <Link onClick={() => setOpen(false)} to="/about" className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors">About</Link>
            <Link onClick={() => setOpen(false)} to="/contacts" className="text-mainblack hover:text-secondary/75 active:text-secondary transition-colors">Contacts</Link>

        {/* login button visible on mobile */}
            <LoginButton />
          </div>
        </div>
      )}
    </>
  );
}
