// TightCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ReviewCard from "./ReviewCard";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import wall from "../../assets/wall.jpg";

const reviews = [
  { id:1, name:"Parindya Hewage", image:"https://picsum.photos/seed/rev1/400/400", review:"this is very important valuable help to my healht management with my busy life easyily " },
  { id:2, name:"Charu Silva", image:"https://picsum.photos/seed/rev2/400/400", review:"Fantastic app — reminders are lifesavers and the reports section is very organised." },
  { id:3, name:"Samanthi", image:"https://picsum.photos/seed/rev3/400/400", review:"Very useful for busy people. Love the reminders!" },
  { id:4, name:"Kamal", image:"https://picsum.photos/seed/rev4/400/400", review:"Good experience. Helpful notifications and clean layout." },
  { id:5, name:"Parindya Hewage", image:"https://picsum.photos/seed/rev1/400/400", review:"this is very important valuable help to my healht management with my busy life easyily " },
  { id:6, name:"Charu Silva", image:"https://picsum.photos/seed/rev2/400/400", review:"Fantastic app — reminders are lifesavers and the reports section is very organised." },
  { id:7, name:"Samanthi", image:"https://picsum.photos/seed/rev3/400/400", review:"Very useful for busy people. Love the reminders!" },
  { id:8, name:"Kamal", image:"https://picsum.photos/seed/rev4/400/400", review:"Good experience. Helpful notifications and clean layout." },
  
];

export default function TightCarousel() {
  return (
    <div
      className="w-full relative overflow-x-hidden p-12"
      style={{
        backgroundImage: `url(${wall})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }}
    >
      <div className="flex flex-row justify-center">
          <h1 className="sm:text-3xl text-2xl font-bold text-secondary text-center ">Why Patients Love Healthify</h1>
          
      </div>
      <h1 className="sm:text-sm text-[10px] text-[#454545] text-center mb-8 px-3 ">Discover how we make personal healthcare simple, secure, and effortless.</h1>
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="3"
        loop={true}
        navigation={{ nextEl: ".next-arrow", prevEl: ".prev-arrow" }}
        pagination={{ clickable: true }}
        spaceBetween={20}
         breakpoints={{
          0:{ slidesPerView: 1 },   // mobile
          600:{ slidesPerView: 2 },
          900:{ slidesPerView: 3 },    // sm+
  }}
        coverflowEffect={{
          rotate: 0,
          stretch: -20,
          depth: 120,
          modifier: 1.05,
          slideShadows: false,
        }}
        className="w-full"
      >
        {reviews.map((r) => (
          <SwiperSlide
            key={r.id}
            style={{
              width: "42vw",        /* ← card width; change if needed */
              maxWidth: "700px",
              display: "flex",
              justifyContent: "center",
              padding: 0,           /* remove extra padding */
            }}
          >
            <ReviewCard name={r.name} image={r.image} review={r.review} />
          </SwiperSlide>
        ))}

        {/* single arrow pair */}
        <div className="prev-arrow absolute left-3 top-1/2  bg-white  shadow p-1  rounded-full cursor-pointer z-40 swiper-button-prev "><IoIosArrowBack className="text-secondary hover:text-white"/></div>
        <div className="next-arrow absolute right-3 top-1/4  bg-white  shadow p-1 rounded-full cursor-pointer z-40 swiper-button-next "><IoIosArrowForward  className="text-secondary hover:text-white"/></div>
      </Swiper>

      <style>{`
        .swiper { overflow: visible; padding: 10px 0; }
        .swiper-slide { transition: transform .28s cubic-bezier(.2,.9,.3,1), box-shadow .28s; }
        .swiper-slide { opacity: 0.92; }
        .swiper-slide-active {
          transform: scale(1.06) translateY(-10px);   /* subtle pop */
          z-index: 60;
          opacity: 1;
          box-shadow: 0 24px 44px rgba(15,23,42,0.18);
        }
        .swiper-slide-next, .swiper-slide-prev {
          transform: scale(0.96);
          z-index: 50;
        }
        /* remove default slide margin if any */
        .swiper-slide > * { margin: 0; width: 100%; }
      `}</style>
    </div>
  );
}
