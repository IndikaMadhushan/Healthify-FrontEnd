import React from "react";
import Button from ".//HomeButton";
import p1 from "../../assets/p1.jpg"
import p2 from "../../assets/p2.avif"
import p3 from "../../assets/p3.jpg"
import p4 from "../../assets/p4.jpg"
import p5 from "../../assets/p5.jpg"
import p6 from "../../assets/p6.jpg"
import p7 from "../../assets/p7.jpg"


export default function JoinHealthy() {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-white">
      {/* Seven positioned avatars using the SAME avatar-spin class (keeps your rotation animation) */}
      <div
        className="rounded-full overflow-hidden avatar-spin"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "6%",
          left: "16%",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p1}
          alt="profile-1"
        />
      </div>

      <div
        className="rounded-full overflow-hidden avatar-spin"
        style={{
          width: "120px",
          height: "120px",
          position: "absolute",
          top: "6%",
          right: "8%",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p2}
          alt="profile-2"
        />
      </div>

      <div
        className="rounded-full  overflow-hidden avatar-spin"
        style={{
          width: "110px",
          height: "110px",
          position: "absolute",
          top: "47%",
          left: "4%",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p3}
          alt="profile-3"
        />
      </div>

      <div
        className="rounded-full overflow-hidden avatar-spin"
        style={{
          width: "140px",
          height: "140px",
          position: "absolute",
          bottom: "3%",
          left: "20%",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p4}
          alt="profile-4"
        />
      </div>

      <div
        className="rounded-full hidden sm:block overflow-hidden avatar-spin"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "20%",
          right: "20%",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p5}
          alt="profile-5"
        />
      </div>

      <div
        className="rounded-full overflow-hidden avatar-spin"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          bottom: "14%",
          right: "15%",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p6}
          alt="profile-6"
        />
      </div>
        
      <div
        className="rounded-full hidden sm:block overflow-hidden avatar-spin"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "5%",
          left: "33%",
          transform: "translateX(-60%)",
        }}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={p7}
          alt="profile-7"
        />
      </div>

      {/* CENTER text overlay — large, professional */}
      <div className="relative z-20 text-center px-4">
        <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#454545] leading-tight">
          1000+ Patients join with us
        </p>
        <p className="mt-2 sm:px-26 px-4 text-[8px] md:text-sm text-gray-600">
         Your medical records stay organized, secure, and always accessible
        </p>
          <Button
          className=" px-10 mt-5 py-4 md:text-3xl text-center text-sm "
          type="button"
          text="Join Healthify"
          style={{ backgroundColor: `#18AAB0` }}
        />
        
          {/* <button className="mt-8 text-xl font-bold py-4 px-9 focus:outline-none md:w-2/5 lg:w-1/2 2xl:w-2/5 bg-secondary">Join Healthify</button> */}
      </div>

      {/* YOUR ORIGINAL ANIMATION CSS (kept exactly as you had it) */}
      <style>{`
        /* FULL TIME INFINITE ROTATION */
        @keyframes fullRotate {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .avatar-spin {
          animation: fullRotate 8s linear infinite; 
          /* smooth 8s rotation loop */
          transition: box-shadow 0.3s ease;
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
        }

        /* Optional: Slight lift when hover */
        .avatar-spin:hover {
          box-shadow: 0 25px 50px rgba(0,0,0,0.35);
        }

        /* small screens: scale avatars down and reposition slightly */
        @media (max-width: 640px) {
          .avatar-spin { transform-origin: center; }
        }
      `}</style>
    </div>
  );
}





