import React from "react";
import ServiceCard from "./ServiceCard";
import { MdUploadFile } from "react-icons/md";
import { motion } from "framer-motion";

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
    <div className="sm:pt-16 py-6 ">
      
      <div>
        <h1 className="text-3xl font-bold text-center text-[#454545]">
          Our Services
        </h1>
      </div>

      {/* Motion wrapper */}
      <motion.div
        className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 sm:px-20 px-6 py-16 place-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Smart Report Upload"
            desc="Upload your medical reports in seconds. PDFs, images, or scans stored securely in one place."
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Health Data Analytics"
            desc="Visual graphs and trends that help you understand blood sugar, cholesterol, BP, and overall health progress."
          />
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Medication Reminders"
            desc="Never miss a dose again with automated medicine reminders and schedule tracking."
          />
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Doctor Access"
            desc="Doctors can securely access your medical reports and full medical history anytime."
          />
        </motion.div>

        {/* Card 5 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Family Medical History "
            desc="Keep track of family health records, vaccinations, allergies, and long-term medical history."
          />
        </motion.div>

        {/* Card 6 */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            Icon={MdUploadFile}
            title="Manage Clinic Book"
            desc="Easily organize your clinic book with your visits and prescriptions in one smart way."
          />
        </motion.div>

      </motion.div>
    </div>
  );
}