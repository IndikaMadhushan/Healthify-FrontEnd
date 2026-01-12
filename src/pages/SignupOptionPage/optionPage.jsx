
import Footer from "../../components/footer";
import OptionCard from "./optionCard";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Header from "../HomePage/Header";

export default function OptionPage() {
  return (
    <div className="min-h-screen w-full items-center justify-center bg-gradient-to-br flex from-[#F7FCFB] via-white to-[#EAF7F6]  ">
   
      <div className="flex flex-col items-center justify-center px-4 py-16">

        {/* TITLE SECTION */}
        <div className="text-center max-w-xl mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F4F52]">
            Join <span className="text-secondary">Healthify</span>
          </h1>
          <p className="mt-3 text-gray-600 text-base md:text-lg">
            Choose how you want to access and manage healthcare services
          </p>
        </div>

        {/* OPTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl justify-items-center ">
          
          <OptionCard
            icon={<FaUserDoctor />}
            title="Doctor Account"
            subtitle="Access patient records and manage prescriptions securely"
            role="DOCTOR"
            path="/login"
          />

          <OptionCard
            icon={<FaUser />}
            title="Patient Account"
            subtitle="Track medical history, prescriptions, and reports"
            role="PATIENT"
            path="/login"
          />

        </div>

        {/* TRUST NOTE */}
        <div className="mt-14 text-sm text-gray-500 text-center max-w-md">
          Your data is protected using healthcare-grade security standards.
        </div>

      </div>

      {/* <Footer /> */}
    </div>
  );
}