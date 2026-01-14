// import { IoIosArrowRoundForward } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

// export default function OptionCard({ icon, title, subtitle, role, path }) {
//   const navigate = useNavigate();
  
//   const handleClick = () => {
//     navigate(path, {
//       state: { role }, //  pass role
//     });
//   };
  
//   return( 
//     <div 
//       className="group flex flex-col lg:w-[450px] md:w-[350px] xs:w-[380px] rounded-2xl p-4 justify-center items-center gap-5 border-primary hover:bg-primary/30 border-2 active:bg-primary/60 cursor-pointer"
//       onClick={handleClick}
//     > 
//       <div className="lg:text-6xl text-4xl text-white bg-primary lg:p-5 p-3 rounded-full group-hover:bg-white group-hover:text-primary">
//         {icon}
//       </div>

//       <div className="text-center"> 
//         <div className="lg:text-2xl text-xl font-bold text-mainblack">
//           {title}
//         </div> 

//         <div className="text-sm">
//           {subtitle}
//         </div> 
//       </div> 

//       <div className="text-center text-primary flex items-center group-hover:underline text-sm"> 
//         {/* {link} <IoIosArrowRoundForward className="text-2xl" />  */}
//       </div> 
//     </div> 
//   );
// }

import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function OptionCard({ icon, title, subtitle, role, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path, {
      state: { role }, // keep role logic
    });
  };

  return (
    <div
      onClick={handleClick}
      className="
        group cursor-pointer
        flex flex-col items-center text-center
        w-full max-w-[420px]
        rounded-2xl p-8
        bg-white/80 backdrop-blur
        border border-[#D3F0ED]
        shadow-sm
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* ICON */}
      <div
        className="
          mb-4
          w-20 h-20
          flex items-center justify-center
          rounded-full
          bg-[#EAF7F6]
          text-secondary
          text-4xl
          group-hover:scale-110
          transition
        "
      >
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="text-xl md:text-2xl font-semibold text-[#0F4F52]">
        {title}
      </h3>

      {/* SUBTITLE */}
      <p className="mt-2 text-sm md:text-base text-gray-600">
        {subtitle}
      </p>

      
      
    </div>
  );
}