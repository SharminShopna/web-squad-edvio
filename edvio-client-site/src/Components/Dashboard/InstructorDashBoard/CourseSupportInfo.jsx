import React from "react";
import { motion } from "framer-motion";

const CourseSupportInfo = ({ register }) => {
  return (
    <motion.div
      className="bg-neutral p-8 rounded-xl shadow-lg border border-aquamarine/20"
      whileHover={{ scale: 1.005 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-TealGreen border-b pb-2 border-aquamarine/30">
        Support Information
      </h2>
      <div>
        <label className="block text-sm font-medium text-tealGreen mb-1">
          Support Email*
        </label>
        <input
          type="email"
          {...register("supportEmail", { required: true })}
          className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
          placeholder="support@course.com"
        />
      </div>
    </motion.div>
  );
};

export default CourseSupportInfo;
