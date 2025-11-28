import { useState, useEffect } from 'react';
import { navItems } from '../../data/data';  // Import navItems
import Button from "./HomeButton";  // Import the Button component
import { Link } from 'react-router-dom';  // Import Link for routing

const Header = ({ colorDeep }) => {
  const [openMenu, setOpenMenu] = useState(false);  // State for toggling mobile menu
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track screen width

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close the menu if the screen width is large (lg breakpoint or above)
  useEffect(() => {
    if (screenWidth >= 1024) {
      setOpenMenu(false);  // Close the menu when screen size is large
    }
  }, [screenWidth]);

  return (
    <header className="flex lg:items-center lg:justify-between lg:flex-row lg:gap-0 w-full md:px-20 flex-col gap-4 px-6">
      {/* Logo */}
      <div className="flex flex-row items-center justify-between lg:w-full w-auto">
        <div className="flex justify-center items-center h-10 w-18 rounded-lg p-1">
          <img
            src="logo.png"
            alt="logo"
            className="w-[150px] h-auto max-w-[100px] md:max-w-[150px] lg:max-w-[200px]"
            width="50"
            height="80"
          />
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden flex items-center ml-auto">
          <button onClick={() => setOpenMenu(!openMenu)} className="text-xl">
            {openMenu ? (
              <span>&#10005;</span>  // Close icon (X)
            ) : (
              <span>&#9776;</span>  // Hamburger menu icon (3 horizontal lines)
            )}
          </button>
        </div>
      </div>

      {/* Navbar Links */}
      <nav className={`lg:flex ${openMenu ? 'absolute bg-white rounded-xl z-60 top-10 right-0 w-full' : 'hidden'} lg:block`}>
        <ul className="flex lg:flex-row items-center lg:gap-0 flex-col justify-center gap-4 list-none">
          {navItems.map(item => (
            <li key={item.id}>
              <Link 
                to={item.path}  // Use 'path' to route correctly
                onClick={() => setOpenMenu(false)}  // Close the menu when a link is clicked
                className="lg:px-4 py-2 lg:mt-8 md:text-base text-[#454545] transparent lg:ml-4 mt-2 text-sm  focus:outline-none focus:shadow-outline hover:text-amber-950 rounded-xl " 
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <Button
          className="px-10 py-1 md:text-base text-center text-sm w-full"
          type="button"
          text="Login"
          style={{ backgroundColor: `${colorDeep}` }}
        />
      </nav>
    </header>
  );
};

export default Header;