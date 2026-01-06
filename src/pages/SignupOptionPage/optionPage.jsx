import Footer from "../../components/footer";
import OptionCard from "./optionCard";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Header from "../HomePage/Header";

export default function OptionPage() {
  return (
    <div>
      <Header />
      <div className="w-full  md:h-screen flex flex-col justify-center items-center gap-4 md:py-0 py-10 px-4">
        <div className="md:mb-11 mb-5">
          <div className="md:text-3xl text-2xl font-bold text-center">
            <span className="text-secondary">Signup </span>Healthify As...
          </div>
          <div className="md:text-[20px] text-[15px] text-center">
            Select your account type to get started
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-10 justify-center items-center">
          <OptionCard
            icon={<FaUserDoctor />}
            title="I’m a Doctor"
            subtitle="Access patient records and provide better care"
            role="DOCTOR"
            path="/login"
          />
          <OptionCard
            icon={<FaUser />}
            title="I’m a Patient"
            subtitle="Manage health records and track your wellness journey"
            role="PATIENT"
            path="/login"
          />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
