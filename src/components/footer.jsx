import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div id="footer" className="w-full bg-white text-[#454545] pt-8 border-t-2 border-t-secondary ">

      {/* MAIN FOOTER CONTENT */}
      <div className="
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
      ">

        {/* Logo + Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="logo.png" className="w-[160px] md:w-[200px] mb-3" alt="Logo" />
          <p className="text-[12px] md:text-[14px] leading-relaxed font-light">
            Healthify makes tracking your health simple and secure.
            <br />
            Your health, your control.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-4 md:mb-6">
            <img src="Phone.png" className="w-[30px] md:w-[40px] mb-1" alt="Phone" />
            <p className="text-[12px] md:text-[14px] font-light">Have a question?</p>
            <p className="text-[12px] md:text-[14px] font-medium">+94 114545678</p>
          </div>

          <div className="flex flex-col items-center">
            <img src="Email.png" className="w-[30px] md:w-[40px] mb-1" alt="Email" />
            <p className="text-[12px] md:text-[14px] font-light">Email us</p>
            <p className="text-[12px] md:text-[14px] font-medium">healthify@gmail.com</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-[20px] md:text-[24px] font-bold text-secondary mb-3 md:mb-4">
            Quick Links
          </p>

          <div className="flex flex-col gap-[6px] md:gap-[10px] text-[12px] md:text-[14px] font-light">
            <Link to="/home" className="hover:text-secondary/75">Home</Link>
            <Link to="/about" className="hover:text-secondary/75">About</Link>
            <Link to="/contacts" className="hover:text-secondary/75">Contact Us</Link>
            <Link to="/FAQ" className="hover:text-secondary/75">FAQs</Link>
            <Link to="/policy" className="hover:text-secondary/75">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary/75">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="w-full h-[45px] md:h-[50px] bg-secondary flex items-center justify-center text-white">
        <p className="text-[14px] md:text-[16px]">
          &copy; {new Date().getFullYear()} Healthify System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
