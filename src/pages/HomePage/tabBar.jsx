
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineSecurity, MdOutlineAnalytics,  MdVerifiedUser } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import CountUp from "./CountUp";

export default function TagBar() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
    useEffect(() => {
  const el = containerRef.current;
  if (!el) return;

  let thresholdValue = 0.25; // default

  if (window.innerWidth >= 1024) {
    // lg screens
    thresholdValue = 0.5;
  } else if (window.innerWidth >= 640) {
    // sm screens
    thresholdValue = 0.25;
  } 
  // xs screens (<640) keep default: 0.125

  console.log("Using threshold:", thresholdValue);

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      });
    },
    { threshold: thresholdValue }
  );

  obs.observe(el);

  return () => obs.disconnect();
}, []);

  return (
    <div ref={containerRef} className="w-full h-auto bg-secondary sm:my-0 my-8 flex justify-center ">
      <div className="h-full grid lg:grid-cols-4 grid-cols-2 justify-items-center place-content-center text-white font-bold gap-6 sm:px-16 px-10 py-8">

        <div className="h-[150px] sm:w-[320px] flex flex-row items-center justify-center sm:gap-0 gap-2 ">
          <FaUserFriends className="sm:text-5xl text-3xl text-primary mb-1" />
          <div>
            <p className="sm:text-4xl text-2xl font-extrabold text-white leading-tight">
              {visible ? <CountUp start={500} end={1000} duration={400} suffix="+" /> : "0+"}
            </p>
            <p className="text-sm font-medium text-gray-200 tracking-wide">Patients</p>
          </div>
        </div>

        {/* ... other cards (same pattern) ... */}
        <div className="h-[150px] sm:w-[320px] flex flex-row items-center justify-center sm:gap-0 gap-2">
          <FaUserDoctor className="sm:text-5xl text-3xl text-primary mb-1" />
          <div>
            <p className="sm:text-4xl text-2xl font-extrabold text-white leading-tight">
              {visible ? <CountUp end={300} duration={400} suffix="+" /> : "0+"}
            </p>
            <p className="text-sm font-medium text-gray-200 tracking-wide">Doctors</p>
          </div>
        </div>

        <div className="h-[150px] sm:w-[320px] flex flex-row items-center justify-center sm:gap-0 gap-2">
          <MdOutlineSecurity className="sm:text-5xl text-3xl text-primary mb-1" />
          <div>
            <p className="sm:text-4xl text-2xl font-extrabold text-white leading-tight">
              {visible ? <CountUp end={100} duration={400} suffix="%" formatter={(n)=>Math.round(n)} /> : "0%"}
            </p>
            <p className="text-sm font-medium text-gray-200 tracking-wide">Secure</p>
          </div>
        </div>

        <div className="h-[150px] sm:w-[320px] flex flex-row items-center justify-center sm:gap-0 gap-2">
          <MdVerifiedUser className="sm:text-5xl text-3xl text-primary mb-1" />
          <div>
            <p className="sm:text-4xl text-2xl font-extrabold text-white leading-tight">
              {visible ? <CountUp end={95} duration={400} suffix="%" /> : "0%"}
            </p>
            <p className="text-sm font-medium text-gray-200 tracking-wide">Accurate</p>
          </div>
        </div>

      </div>
    </div>
  );
}


