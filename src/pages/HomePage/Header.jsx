// import { useNavigate} from "react-router-dom";
// import Button from "./HomeButton";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { useState,useEffect } from "react";
// import { RxCross1 } from "react-icons/rx";

// const goToFooter = () => {
//   const element = document.getElementById("footer");
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
// };

// const goToService = () => {
//   const element = document.getElementById("services");
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
  
// };

// const goToAbout = () => {
//   const element = document.getElementById("about");
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
  
// };

// const goToHome = () => {
//   const element = document.getElementById("home");
//   if(element) {
//     element.scrollIntoView({behavior : "smooth"})
//   }
// }

// export default function Header(){


//   const navigate = useNavigate();
//   useEffect(() => {
//     window.scrollTo(0,0);
//   },[]);
//   const [openMenu, setOpenMenu] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return(

// <div
//   className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
//     flex flex-row justify-between lg:px-14 px-4 md:px-6`}
// >
//         <div>
//             <img src="logo.png" alt="logo" className="h-[70px] h-[60px] object-contain cursor-pointer " onClick={() => navigate("/")}/>
//         </div>
//         <div className="pt-5">
//         <div className={`flex flex-row text-sm     font-semibold  items-center lg:gap-10 md:gap-5 `} >
//             <div>
//                   <p className="hidden md:block cursor-pointer hover:text-secondary " onClick={() => navigate("/")}>Home</p>
//             </div>
            
//             <div>
//                   <p className="hidden md:block cursor-pointer hover:text-secondary " onClick={() => { navigate("/aboutUs")}}>About Us</p> 
//             </div>
//             <div>
//                   <p className="hidden md:block cursor-pointer hover:text-secondary " onClick={goToService}>Services</p> 
//             </div>
//             <div>
//                   <p className="hidden md:block cursor-pointer hover:text-secondary " onClick={goToFooter}>Contact</p> 
//             </div>
//             <div>
//                 <Button onClick={() => navigate("/login")}
//                 type="button"
//                 text="Login"
//                  className="py-1 px-6  font-bold  focus:outline-none hidden md:block bg-secondary"
               
//                 />
                
//             </div>
            
//         </div>
//           <div className="md:hidden block text-xl text-secondary "onClick={() => setOpenMenu(true)}><RxHamburgerMenu /></div>
//         </div>

//         {/*mobile drop down*/}
//         {openMenu && (
//         <div className="fixed inset-0 bg-black/60 z-9999 md:hidden block ">
//           <div className="bg-[#161616]  w-1/2 h-full p-6">
            
//             <button
//               className="text-2xl mb-4 text-white"
//               onClick={() => setOpenMenu(false)}
              
//             >
//               <RxCross1 />
//             </button>

//             <div className="flex flex-col gap-4 font-semibold text-secondary  text-center">
              
//               <img src="logo.png" alt="logo" className="h-[80px] h-[60px] object-contain hover:cursor-pointer"/>

//               <p className="hover:text-white cursor-pointer"  onClick={() => { navigate("/"); setOpenMenu(false); }}>Home</p>
//               <p className="hover:text-white cursor-pointer" onClick={goToService}>Services</p>
//               <p className="hover:text-white cursor-pointer" onClick={() => { navigate("/aboutUs")}}>About Us</p>
//               <p className="hover:text-white cursor-pointer" onClick={goToFooter}>Contact</p>
              
//               <Button onClick={() => {navigate("/login"); setOpenMenu(false);}}
//                 type="button"
//                 text="Login"
//                  className="py-1 px-6  font-bold  focus:outline-none "
//                 style={{ backgroundColor: '#18AAB0'}}
//                 />
//             </div>

//           </div>
//         </div>
//       )}
//       </div>
//     
//   )
// }


// import { useNavigate } from "react-router-dom";
// import Button from "./HomeButton";
// import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
// import { useState, useEffect } from "react";

// const goToFooter = () => {
//   const element = document.getElementById("footer");
//   if (element) element.scrollIntoView({ behavior: "smooth" });
// };

// const goToService = () => {
//   const element = document.getElementById("services");
//   if (element) element.scrollIntoView({ behavior: "smooth" });
// };

// export default function Header() {
//   const navigate = useNavigate();

//   const [openMenu, setOpenMenu] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {/* HEADER (UNCHANGED) */}
//       <div
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
//         ${isScrolled ? "bg-white shadow-md" : "bg-transparent"} 
//         flex items-center justify-between lg:px-14 px-4 md:px-6`}
//       >
//         {/* LEFT - Hamburger */}
//         <div
//           className="md:hidden text-xl text-secondary cursor-pointer"
//           onClick={() => setOpenMenu(true)}
//         >
//           <RxHamburgerMenu />
//         </div>

//         {/* LOGO */}
//         <div className="flex-1 flex justify-center md:justify-start">
//           <img
//             src="logo.png"
//             alt="logo"
//             className="h-[60px] object-contain cursor-pointer"
//             onClick={() => navigate("/")}
//           />
//         </div>

//         {/* DESKTOP */}
//         <div className="hidden md:flex pt-5">
//           <div className="flex flex-row text-sm font-semibold items-center lg:gap-10 md:gap-5">
//             <p onClick={() => navigate("/")} className="cursor-pointer hover:text-secondary">Home</p>
//             <p onClick={() => navigate("/aboutUs")} className="cursor-pointer hover:text-secondary">About Us</p>
//             <p onClick={goToService} className="cursor-pointer hover:text-secondary">Services</p>
//             <p onClick={goToFooter} className="cursor-pointer hover:text-secondary">Contact</p>

//             <Button
//               onClick={() => navigate("/login")}
//               text="Login"
//               className="py-1 px-6 font-bold bg-secondary"
//             />
//           </div>
//         </div>

//         {/* MOBILE LOGIN */}
//         <div className="md:hidden">
//           <Button
//             onClick={() => navigate("/login")}
//             text="Login"
//             className="py-1 px-4 text-sm font-bold bg-secondary"
//           />
//         </div>
//       </div>

//       {/* MODERN OVERLAY MENU */}
//       {openMenu && (
//         <div className="fixed inset-0 z-[9999] md:hidden">
          
//           {/* BACKGROUND BLUR */}
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setOpenMenu(false)}
//           ></div>

//           {/* MENU PANEL */}
//           <div className="absolute top-0 left-0 w-full bg-white rounded-b-3xl shadow-lg p-6 animate-slideDown">
            
//             {/* TOP BAR */}
//             <div className="flex justify-between items-center mb-6">
//               <RxCross1
//                 className="text-2xl cursor-pointer"
//                 onClick={() => setOpenMenu(false)}
//               />

//               <img
//                 src="logo.png"
//                 alt="logo"
//                 className="h-[40px]"
//               />

//               <Button
//                 onClick={() => {
//                   navigate("/login");
//                   setOpenMenu(false);
//                 }}
//                 text="Login"
//                 className="py-1 px-4 text-sm font-bold bg-secondary"
//               />
//             </div>

//             {/* MENU ITEMS */}
//             <div className="flex flex-col gap-6 text-lg font-semibold">
              
//               <p onClick={() => {navigate("/"); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
//                 Home
//               </p>

//               <p onClick={() => {goToService(); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
//                 Services
//               </p>

//               <p onClick={() => {navigate("/aboutUs"); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
//                 About Us
//               </p>

//               <p onClick={() => {goToFooter(); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
//                 Contact
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ANIMATION STYLE */}
//       <style>
//         {`
//         @keyframes slideDown {
//           from {
//             transform: translateY(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//         `}
//       </style>
//     </>
//   );
// }


import { useNavigate } from "react-router-dom";
import Button from "./HomeButton";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const goToFooter = () => {
  const element = document.getElementById("footer");
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

const goToService = () => {
  const element = document.getElementById("services");
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

export default function Header() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent"} 
        flex items-center justify-between lg:px-14 px-4 md:px-6 h-[70px]`}
      >
        {/* Hamburger */}
        <div
          className="md:hidden text-2xl text-secondary cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <IoClose /> : <HiMenuAlt2 />}
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <img
            src="/logo.png"
            alt="logo"
            className="sm:h-[60px] h-[50px] object-contain cursor-pointer mb-2 ml-3"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex pt-5">
          <div className="flex flex-row text-sm font-semibold items-center lg:gap-10 md:gap-5">
            <p onClick={() => navigate("/")} className="cursor-pointer hover:text-secondary">Home</p>
            <p onClick={() => navigate("/aboutUs")} className="cursor-pointer hover:text-secondary">About Us</p>
            <p onClick={goToService} className="cursor-pointer hover:text-secondary">Services</p>
            <p onClick={goToFooter} className="cursor-pointer hover:text-secondary">Contact</p>

            <Button
              onClick={() => navigate("/login")}
              text="Login"
              className="py-1 px-6 font-bold bg-secondary"
            />
          </div>
        </div>

        {/* Mobile login */}
        <div className="md:hidden">
          <Button
            onClick={() => navigate("/login")}
            text="Login"
            className="py-1 px-4 text-sm font-bold bg-secondary"
          />
        </div>
      </div>

  
  {openMenu && (
  <div className="fixed inset-0 z-[9999] md:hidden pointer-events-none">
  {/* // <div className="fixed top-[70px] left-0 w-full h-[calc(100%-10px)] z-[9999] md:hidden"> */}

    {/* BLUR ONLY BELOW HEADER */}
    <div
  className="absolute top-[70px] left-0 w-full h-[calc(100%-70px)] bg-black/40 backdrop-blur-sm pointer-events-auto"
  onClick={() => setOpenMenu(false)}
></div>

    {/* MENU PANEL */}
   <div className="absolute top-[70px] left-0 w-full h-1/4 bg-white shadow-lg p-6 animate-slideLeft pointer-events-auto">
      {/* Menu items */}
      <div className="flex flex-col gap-6 text-md ">
        
                      <p onClick={() => {navigate("/"); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
                Home
              </p>

              <p onClick={() => {goToService(); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
                Services
              </p>

              <p onClick={() => {navigate("/aboutUs"); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
                About Us
              </p>

              <p onClick={() => {goToFooter(); setOpenMenu(false);}} className="cursor-pointer hover:text-secondary">
                Contact
              </p>
        {/* <Button
          onClick={() => {
            navigate("/login");
            setOpenMenu(false);
          }}
          text="Login"
          className="py-2 px-6 font-bold mt-4"
          style={{ backgroundColor: "#18AAB0" }}
        /> */}
      </div>
    </div>
  </div>
)}

      {/* ANIMATION */}
      <style>
        {`
        @keyframes slideLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slideLeft {
          animation: slideLeft 0.3s ease-out;
        }
        `}
      </style>
    </>
  );
}