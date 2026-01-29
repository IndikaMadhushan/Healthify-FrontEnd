import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";

export default function ClinicBookFlip({ book, onClose }) {
  const bookRef = useRef(null);

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
        className="absolute top-6 right-6 bg-white p-3 rounded-full">
        <FaTimes />
      </button>

      <button onClick={flipPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2
                   bg-white p-4 rounded-full">
        <FaArrowLeft />
      </button>

      <button onClick={flipNext}
        className="absolute right-6 top-1/2 -translate-y-1/2
                   bg-white p-4 rounded-full">
        <FaArrowRight />
      </button>

      <HTMLFlipBook
        ref={bookRef}
        width={420}
        height={600}
        showCover
        className="shadow-2xl"
      >
        {/* COVER */}
        <div className="bg-gradient-to-br from-[#18AAB0] to-[#86C443]
                        text-white p-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold bg-secondary rounded-2xl p-2 text-center">Clinic Book</h1>
          <div className="flex flex-col j items-center mt-10">
            <BiSolidBookAdd className="text-9xl text-center"/>
            <p className="mt-1 text-center">Dr. {book.doctorName}</p>
            <p className="text-center">{book.doctorNo}</p>
            <p className="mt-1 text-center">{book.specialization}</p>
            <p className="mt-1 font-semibold text-xl text-center"> {book.medicationPurpose}</p>
          </div>
        </div>

        <div className="bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-lg">Doctor Details</h2>
          <p className="mt-2">Dr. {book.doctorName}</p>
          <p>{book.doctorNo}</p>
        </div>

        <div className="bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-lg">Medication Purpose</h2>
          <p className="mt-2">{book.medicationPurpose}</p>
        </div>
      </HTMLFlipBook>
    </div>
  );
}