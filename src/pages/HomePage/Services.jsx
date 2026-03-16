import React from "react";
import ServiceCard from "./ServiceCard";
import { MdUploadFile } from "react-icons/md";
import { motion } from "framer-motion";
import { MdCloudUpload } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaAddressBook } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";





// Parent animation (stagger)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

// Child card animation
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ServicesExample() {
  return (
    <div id="services" className="sm:pt-16 py-6 ">
      
      <div>
        <h1 className="text-3xl font-bold text-center text-[#454545]">
          Our Services
        </h1>
      </div>

      {/* Motion wrapper */}
      <motion.div
        className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 sm:px-10 px-6 py-16 place-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            image="report.webp"
            icon={<MdCloudUpload />}
            title="Smart Report Upload"
            description="Upload your medical reports in seconds. PDFs, images, or scans stored securely in one place."
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            image="datas.webp"
            icon={<SiGoogleanalytics />}
            title="Health Data Analytics"
            description="Visual graphs and trends that help you understand blood sugar, cholesterol, BP, and overall health progress."
          />
        </motion.div>
        {/* Card 5 */}
        <motion.div variants={cardVariants}>
           <ServiceCard
            image="doc.jpg"
            icon={<FaUserDoctor />}
            title="Doctor Access"
            description="Doctors can securely access your medical reports and full medical history anytime."
          />
        </motion.div>


        {/* Card 3 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            image="remind.jpeg"
            icon={<PiClockCountdownFill />}
            title="Medication Reminders"
            description="Never miss a dose again with automated medicine reminders and schedule tracking."
          />
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            image="book.webp"
            icon={<FaAddressBook />}
            title="Manage Clinic Book"
            description="Easily organize your clinic book with your visits and prescriptions in one smart way."
          />
        </motion.div>

        
        {/* Card 6 */}
        {/* <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Manage Clinic Book"
            desc="Easily organize your clinic book with your visits and prescriptions in one smart way."
          />
        </motion.div> */}

        <ServiceCard
  image="family.jpg"
  icon={<MdOutlineFamilyRestroom />}
  title="Family Medical History"
  description="Keep track of family health records, vaccinations, allergies, and long-term medical history."
/>

      </motion.div>
    </div>
  );
}