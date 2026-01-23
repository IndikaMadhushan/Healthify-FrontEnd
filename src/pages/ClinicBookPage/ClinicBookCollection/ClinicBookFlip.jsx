import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ClinicBookFlip() {
  const bookRef = useRef(null);
  const navigate = useNavigate();

  // Flip helpers
  const flipPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const flipNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  // Close logic
  const handleClose = () => {
    const flip = bookRef.current?.pageFlip();
    if (!flip) return;

    if (flip.getCurrentPageIndex() !== 0) {
      // Go back to cover first
      flip.flip(0);
    } else {
      // Already on cover → exit
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F4F52] flex items-center justify-center">

      {/* CLOSE BUTTON (TOP RIGHT) */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaTimes />
      </button>

      {/* LEFT ARROW */}
      <button
        onClick={flipPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2
                   bg-white p-4 rounded-full shadow-xl
                   hover:scale-110 transition"
      >
        <FaArrowLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={flipNext}
        className="absolute right-6 top-1/2 -translate-y-1/2
                   bg-white p-4 rounded-full shadow-xl
                   hover:scale-110 transition"
      >
        <FaArrowRight />
      </button>

      {/* FLIP BOOK */}
      <HTMLFlipBook
        ref={bookRef}
        width={420}
        height={600}
        size="fixed"
        showCover={true}
        maxShadowOpacity={0.5}
        className="shadow-2xl"
      >

        {/* COVER */}
        <div className="bg-gradient-to-br from-[#18AAB0] to-[#86C443]
                        text-white p-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Clinic Book</h1>
          <p className="mt-2 opacity-90">Patient Medical Record</p>
        </div>

        {/* PAGE 1 */}
        <div className="bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-lg text-[#0F4F52]">
            Doctor
          </h2>
          <p className="mt-2">Dr. Suraj Perera</p>
        </div>

        {/* PAGE 2 */}
        <div className="bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-lg text-[#0F4F52]">
            Last Visit
          </h2>
          <p className="mt-2">23 Jan 2026</p>
        </div>

        {/* PAGE 3 */}
        <div className="bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-lg text-red-600">
            ⚠ Allergies
          </h2>
          <p className="mt-2">Penicillin</p>
        </div>

      </HTMLFlipBook>
    </div>
  );
}