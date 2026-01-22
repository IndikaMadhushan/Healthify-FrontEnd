
import logo from "../../assets/logo.png";
import phone from "../../assets/Phone.png";
import email from "../../assets/Email.png";


export default function Footer() {
  return (
    <div id="footer" className="w-full bg-white text-black pt-8 border-t-2 border-teal-500 ">
      {/* <div className="
        max-w-[1440px] 
        mx-auto 
        px-6 
        md:px-12 
        xl:px-[160px]
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-8 
        md:gap-12 
        pb-10
      "> */}


//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Left Section - Logo and Tagline */}
//           <div className="space-y-4">
//                 <img src={logo} className="w-[200px]" />

//             {/* <svg width="180" height="50" viewBox="0 0 180 50" className="h-12">
              
//               <text x="35" y="35" fontSize="32" fontWeight="bold" fill="#4db8a8">Health</text>
//               <text x="130" y="35" fontSize="32" fontWeight="bold" fill="#7bc142">ify</text>
//               <circle cx="75" cy="15" r="8" fill="#e74c3c"/>
//               <circle cx="68" cy="22" r="6" fill="#3498db"/>
//               <path d="M 65 10 Q 70 5 75 10" stroke="#e74c3c" strokeWidth="2" fill="none"/>
//             </svg> */}
//             <div className="text-gray-600 space-y-1">
//               <p>Healthify makes tracking your health</p>
//               <p>simple and secure.</p>
//               <p className="font-medium">Your health, your control.</p>
//             </div>
//           </div>

//           {/* Middle Section - Contact */}
//           <div className="space-y-6">
//             <div className="flex items-start gap-3">
//                 <img src={phone} className="w-10" />

//               {/* <svg className="w-6 h-6 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg> */}
//               <div>
//                 <p className="text-gray-600">Do you have a question?</p>

//                 <p className="text-gray-800 font-semibold">Contact us at +94 1145475678</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               {/* <svg className="w-6 h-6 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg> */}
//                               <img src={email} className="w-[30px] md:w-[40px] mb-1"/>

//               <div>
//                 <p className="text-gray-600">Send us an email at</p>
//                 <p className="text-gray-800 font-semibold">healthify@gmail.com</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Quick Links */}
//           <div>
//             <h3 className="text-xl font-semibold text-teal-500 mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li><a href="#" className="hover:text-teal-500 transition">About</a></li>
//               <li><a href="#" className="hover:text-teal-500 transition">How it Works</a></li>
//               <li><a href="#" className="hover:text-teal-500 transition">FAQs</a></li>
//               <li><a href="#" className="hover:text-teal-500 transition">Terms & Conditions</a></li>
//               <li><a href="#" className="hover:text-teal-500 transition">Privacy Policy</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright Bar */}
//       <div className="w-full h-[45px] md:h-[50px] bg-teal-500 flex items-center justify-center text-white">
//         <p className="text-[14px] md:text-[16px]">
//           &copy; {new Date().getFullYear()} Healthify System. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// }