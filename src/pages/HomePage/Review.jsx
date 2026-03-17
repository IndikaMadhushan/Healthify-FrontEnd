import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ReviewCard from "./ReviewCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import wall from "../../assets/wall.jpg";
import { getPublicSiteReviewsApi } from "../../api/SiteReviewApi";

export default function TightCarousel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublicReviews = async () => {
      try {
        const data = await getPublicSiteReviewsApi();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load public site reviews", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadPublicReviews();
  }, []);

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
        <h1 className="sm:text-3xl text-2xl font-bold text-secondary text-center">
          Why Patients Love Healthify
        </h1>
      </div>
      <h1 className="sm:text-sm text-[10px] text-[#454545] text-center mb-8 px-3">
        Discover how we make personal healthcare simple, secure, and effortless.
      </h1>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/80 backdrop-blur border border-white/60 p-10 text-center text-gray-600 shadow-sm">
          No approved reviews yet.
        </div>
      ) : (
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="3"
          loop={reviews.length > 2}
          navigation={{ nextEl: ".next-arrow", prevEl: ".prev-arrow" }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
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
          {reviews.map((reviewItem) => (
            <SwiperSlide
              key={reviewItem.id}
              style={{
                width: "42vw",
                maxWidth: "700px",
                display: "flex",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <ReviewCard
                name={reviewItem.patientName}
                image={reviewItem.patientPhotoUrl}
                rating={reviewItem.rating}
                review={reviewItem.review}
              />
            </SwiperSlide>
          ))}

          <div className="prev-arrow absolute left-3 top-1/2 bg-white shadow p-1 rounded-full cursor-pointer z-40 swiper-button-prev">
            <IoIosArrowBack className="text-secondary hover:text-white" />
          </div>
          <div className="next-arrow absolute right-3 top-1/4 bg-white shadow p-1 rounded-full cursor-pointer z-40 swiper-button-next">
            <IoIosArrowForward className="text-secondary hover:text-white" />
          </div>
        </Swiper>
      )}

      <style>{`
        .swiper { overflow: visible; padding: 10px 0; }
        .swiper-slide { transition: transform .28s cubic-bezier(.2,.9,.3,1), box-shadow .28s; }
        .swiper-slide { opacity: 0.92; }
        .swiper-slide-active {
          transform: scale(1.06) translateY(-10px);
          z-index: 60;
          opacity: 1;
          box-shadow: 0 24px 44px rgba(15,23,42,0.18);
        }
        .swiper-slide-next, .swiper-slide-prev {
          transform: scale(0.96);
          z-index: 50;
        }
        .swiper-slide > * { margin: 0; width: 100%; }
      `}</style>
    </div>
  );
}
