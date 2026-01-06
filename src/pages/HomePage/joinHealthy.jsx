// import React from "react";
// import Button from ".//HomeButton";
// import p1 from "../../assets/p1.jpg"
// import p2 from "../../assets/p2.avif"
// import p3 from "../../assets/p3.jpg"
// import p4 from "../../assets/p4.jpg"
// import p5 from "../../assets/p5.jpg"
// import p6 from "../../assets/p6.jpg"
// import p7 from "../../assets/p7.jpg"
// import { useNavigate } from "react-router-dom";

// export default function JoinHealthy() {
//   const navigate = useNavigate();
  
//   return (
//     <div className="w-full h-[500px] flex items-center justify-center relative bg-white">
     

//       {/* CENTER text overlay — large, professional */}
//       <div className="relative z-20 text-center px-4">
//         <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#454545] leading-tight">
//           1000+ Patients join with us
//         </p>
//         <p className="mt-2 sm:px-26 px-4 text-[8px] md:text-sm text-gray-600">
//          Your medical records stay organized, secure, and always accessible
//         </p>
//           <Button onClick={() => navigate("/option")}
//           className=" px-10 mt-5 py-4 md:text-3xl text-center text-sm "
//           type="button"
//           text="Join Healthify"
//           style={{ backgroundColor: `#18AAB0` }}
//         />
        
//           {/* <button className="mt-8 text-xl font-bold py-4 px-9 focus:outline-none md:w-2/5 lg:w-1/2 2xl:w-2/5 bg-secondary">Join Healthify</button> */}
//       </div>

      
//     </div>
//   );
// }





import React from "react";
import Button from "./HomeButton";
import { useNavigate } from "react-router-dom";
; // you can change image

export default function JoinHealthy() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-r from-[#F2FBFA] to-white">
      <div className="max-w-7xl mx-auto px-6 py-20
                      flex flex-col-reverse lg:flex-row
                      items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold
                         text-[#454545] leading-tight">
            1000+ Patients Trust Healthify
          </h2>

          <p className="mt-4 text-sm sm:text-base  md:text-lg text-gray-600 max-w-xl mx-auto">
            Your medical records stay organized, secure, and always accessible.
            Experience smarter healthcare management today.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Button
              onClick={() => navigate("/option")}
              className="px-10 py-4 text-base sm:text-lg md:text-xl
                         rounded-full shadow-lg hover:shadow-xl
                         transition-transform duration-200 hover:scale-105"
              type="button"
              text="Join Healthify"
              style={{ backgroundColor: "#18AAB0" }}
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src="/WW.avif"
              alt="Healthcare"
              className="w-[300px] sm:w-[380px] md:w-[450px]
                           object-cover"
            />

            {/* Decorative blur circle */}
            <div className="absolute -top-6 -right-6 w-24 h-24
                            bg-[#18AAB0]/20 rounded-full blur-2xl -z-10" />
          </div>
        </div>

      </div>
    </div>
  );
}