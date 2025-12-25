import Footer from "../../components/footer";
import OptionCard from "./optionCard";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

export default function OptionPage() {
  return (
    <div>
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
            link="Register as Doctor"
            path="/doctor-register-1"
          />
          <OptionCard
            icon={<FaUser />}
            title="I’m a Patient"
            subtitle="Manage health records and track your wellness journey"
            link="Register as Patient"
          />
        </div>
        <div className="md:text-sm text-[10px] text-center">
          Already have an account?
          <span className="text-secondary hover:underline">
            <Link to="/login" className="">
              Login here
            </Link>
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
