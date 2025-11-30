import { motion } from "framer-motion";
import doctor from "../../assets/doctor.png";

export default function Empower() {
  return (
    <motion.div
      className="w-full sm:py-16 md:px-26 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="grid grid-col-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-0 items-center justify-items-center">

        {/* LEFT SIDE */}
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-3xl h-auto  font-semibold leading-snug text-center md:text-start text-primary"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Investing in Your Health, <br />
            Investing in Your Future
          </motion.p>

          <motion.p
            className="mt-4 text-center md:text-start text-gray-600 text-sm leading-relaxed "
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Healthify helps you organize, analyze, and understand your medical
            information in a single secure platform.
          </motion.p>
        </motion.div>

        {/* MIDDLE IMAGE */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            className="w-[500px]"
            src={doctor}
            alt="Doctor"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120 }}
          />
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold text-center md:text-start text-gray-800 mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            About Healthify
          </motion.h2>

          <motion.p
            className="text-gray-600 text-sm leading-relaxed mb-4 text-center md:text-start"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our mission is to make personal healthcare easier and more accessible
            by bringing all your medical data together—reports, prescriptions,
            vaccines, and health history—so you never lose important information again.
          </motion.p>

          <motion.ul
            className="text-gray-700 space-y-2 text-sm font-semibold justify-center md:text-start "
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.08 }}
            viewport={{ once: true }}
          >
            {/* LIST ITEM 1 */}
            <motion.li
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{}}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 mr-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white">
                ✓
              </span>
              <span>Medical Health storage</span>
            </motion.li>

            {/* LIST ITEM 2 */}
            <motion.li
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 mr-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white">
                ✓
              </span>
              <span>Health analytics</span>
            </motion.li>

            {/* LIST ITEM 3 */}
            <motion.li
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 mr-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white">
                ✓
              </span>
              <span>Reminders</span>
            </motion.li>

            {/* LIST ITEM 4 */}
            <motion.li
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 mr-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white">
                ✓
              </span>
              <span>Doctor access</span>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
}