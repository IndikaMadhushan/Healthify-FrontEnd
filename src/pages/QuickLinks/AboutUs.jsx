import React, { useEffect } from "react";
import {
  Users,
  Shield,
  Target,
  Activity,
  FileText,
  BarChart3,
  Bell,
  Share2,
} from "lucide-react";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#18AAB0] to-[#86C443] text-white py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Healthify
          </h1>
          <p className="text-base sm:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto">
            <strong>Healthify </strong> is a centralized digital platform that integrates medical records, health tracking, and doctor collaboration into a single, secure system. It is designed to help individuals take full control of their health information in a simple and intelligent way, making healthcare more accessible, efficient, and personalized.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Introduction Card */}
        

        {/* Who We Are - FIXED ALIGNMENT AND STYLING */}
        <section className="mb-10 sm:mb-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
  {/* Header Container - Centered */}
  <div className="flex flex-col items-center justify-center gap-3 mb-6">
    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
      <Users className="w-5 h-5 text-teal-600" />
    </div>
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
      Who We Are
    </h2>
  </div>

  {/* Content Container - Centered */}
  <div className="max-w-2xl mx-auto">
    <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
      <p>
        <strong>Healthify </strong> is developed by Group 2, a team of passionate 3rd-year Computer Science students from the 13th batch, Department of Computer Science, University of Ruhuna, as part of their group project.
      </p>
    </div>
  </div>
</section>

        {/* What We Do */}
        <section className="mb-10 sm:mb-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              What We Do
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: FileText,
                title: "Medical Records Storage",
                desc: "Securely upload and store medical reports and prescriptions",
              },
              {
                icon: Activity,
                title: "Health Data Entry",
                desc: "Enter personal health data such as height, weight, and vital signs",
              },
              {
                icon: BarChart3,
                title: "Auto Analysis",
                desc: "Automatically calculate BMI and analyze health trends",
              },
              {
                icon: BarChart3,
                title: "Visual Dashboards",
                desc: "View results through interactive charts and visual dashboards",
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                desc: "Set medicine, appointment reminders and period tracker for females",
              },
              {
                icon: Share2,
                title: "Secure Sharing",
                desc: "Share medical data with doctors with full permission control",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg hover:bg-teal-50 transition border border-transparent hover:border-teal-100"
              >
                <item.icon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-10 sm:mb-16">
          <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white rounded-xl shadow-lg p-6 sm:p-10 border border-teal-400">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed opacity-95">
              To empower patients with digital access, understanding, and
              control over their health data while enabling doctors to make
              better decisions through accurate, organized, and visualized
              medical information.
            </p>
          </div>
        </section>

        {/* Our Vision */}
        <section className="mb-10 sm:mb-16">
          <div className="bg-gradient-to-br from-[#86C443] to-[#18AAB0] text-white rounded-xl shadow-lg p-6 sm:p-10 border border-green-400">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8" />
              <h2 className="text-xl sm:text-2xl font-bold">Our Vision</h2>
            </div>
            <div className="space-y-3 text-sm sm:text-base">
              {[
                "Patients manage their healthcare digitally",
                "Doctors have quick, reliable access to patient history",
                "National-level digital health platform support",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="opacity-95">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}