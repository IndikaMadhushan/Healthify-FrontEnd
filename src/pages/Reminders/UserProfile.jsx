// import  { useState, useRef, useEffect } from "react";
// import { User, Home, LogOut, ChevronDown } from "lucide-react";
// import user from "../../assets/user.png";


// export default function UserProfile() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!dropdownRef.current) return;
//       if (!dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-3 bg-white hover:bg-teal-50 hover:border-teal-100 px-4 py-2 rounded-lg transition"
//       >
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
//           <img src={user} className="w-28" />
//         </div>

//         <div className="text-left">
//           <div className="font-semibold text-gray-800">Patient</div>
//           <div className="text-sm text-gray-500">patient1@gmail.com</div>
//         </div>

//         <ChevronDown
//           className={`w-5 h-5 text-gray-400 transition-transform ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//           <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-black hover:bg-gray-50">
//             <User className="w-5 h-5 text-gray-600" />
//             My Profile
//           </button>

//           <button className="w-full flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 bg-white">
//             <Home className="w-5 h-5 text-gray-600" />
//             Home
//           </button>

//           {/* <div className="border-t my-2"></div> */}

//           <button className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-red-50">
//             <LogOut className="w-5 h-5 text-red-600" />
//             <span className="text-red-600">Logout</span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
