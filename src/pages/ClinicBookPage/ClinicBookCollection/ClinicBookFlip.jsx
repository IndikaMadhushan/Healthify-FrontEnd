import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { getClinicPagesByBook } from "../../../api/ClinicPageApi";
import { useEffect, useState } from "react";
import axios from "axios";
import BookTemplate from "./BookTemplate";


export default function ClinicBookFlip({ book, onClose }) {

  const bookRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  

  // ✅ MOVE HERE
  useEffect(() => {
    if (!book?.id) return;

    getClinicPagesByBook(book.id)
      .then(res => {
        console.log("API DATA:", res.data.data); // debug
        setPages(res.data.data);
      })
      .catch(err => console.error(err));

  }, [book]);

  if (!book) return null;

  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();

  const handleClose = () => {
    const flip = bookRef.current?.pageFlip();
    if (flip.getCurrentPageIndex() !== 0) {
      flip.flip(0);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                bg-black/40 backdrop-blur-md">

      <button onClick={handleClose}
        className="absolute top-6 right-6 bg-white p-3 rounded-full hover:bg-red">
        <FaTimes />
      </button>

      <button onClick={flipPrev}
        className="absolute left-6 bottom-1/32 -translate-y-1/2
                   bg-white p-4 rounded-full hover:bg-secondary/50">
        <FaArrowLeft />
      </button>

      <button onClick={flipNext}
        className="absolute right-6 bottom-1/32 -translate-y-1/2
                   bg-white p-4 rounded-full hover:bg-secondary/50">
        <FaArrowRight />
      </button>

  <div className="scale-[0.65] sm:scale-[0.85] md:scale-[1] origin-center transition-all">
      <HTMLFlipBook
        ref={bookRef}
        width={520}
        height={700}
        showCover
        className="shadow-2xl"
      >

        {/* COVER */}
        <div className="bg-gradient-to-br from-[#18AAB0] to-[#86C443]
                        text-white p-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold bg-secondary rounded-2xl p-2 text-center">
            Clinic Book
          </h1>

          <div className="flex flex-col items-center mt-10">
            <BiSolidBookAdd className="text-9xl text-center"/>
            <p className="mt-1 text-center">Dr. {book.doctorName}</p>
            <p className="text-center">{book.doctorNo}</p>
            <p className="mt-1 text-center">{book.specialization}</p>
            <p className="mt-1 font-semibold text-xl text-center">
              {book.medicationPurpose}
            </p>
          </div>
        </div>

        {/* OPTIONAL PAGE */}
        {/* <div className="bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-lg">Doctor Details</h2>
          <p className="mt-2">Dr. {book.doctorName}</p>
          <p>{book.doctorNo}</p>
        </div> */}

        {/* 🔥 DYNAMIC PAGES */}
        {pages.map((page) => (
          <div key={page.clinicPageId} className="bg-white p-2">
            <BookTemplate data={page} />
          </div>
        ))}

      </HTMLFlipBook>
        </div>
    </div>
  );
}