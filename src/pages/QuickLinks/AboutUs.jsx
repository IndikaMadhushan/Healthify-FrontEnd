import React from "react";
import {
  Heart,
  Users,
  Shield,
  Target,
  Lightbulb,
  CheckCircle,
  Activity,
  FileText,
  BarChart3,
  Bell,
  Share2,
  Lock,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="140" height="40" viewBox="0 0 180 50" className="h-10">
              <text
                x="35"
                y="35"
                fontSize="32"
                fontWeight="bold"
                fill="#4db8a8"
              >
                Health
              </text>
              <text
                x="130"
                y="35"
                fontSize="32"
                fontWeight="bold"
                fill="#7bc142"
              >
                ify
              </text>
              <circle cx="75" cy="15" r="8" fill="#e74c3c" />
              <circle cx="68" cy="22" r="6" fill="#3498db" />
              <path
                d="M 65 10 Q 70 5 75 10"
                stroke="#e74c3c"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 transition"
            >
              Home
            </a>
            <a href="#" className="text-teal-600 font-semibold">
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 transition"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header> */}

      {/* Hero Section with Background Image Effect */}
      <section className="relative bg-gradient-to-br from-[#18AAB0] to-[#86C443] text-white py-20 sm:py-32 overflow-hidden">
        {/* Overlay pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <Heart className="inline w-5 h-5 mr-2 text-teal-400" />
              <span className="text-sm sm:text-base">
                Your Digital Health Partner
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            About Healthify
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A Personal Healthcare Monitoring System designed to help individuals
            take full control of their medical information in a simple, secure,
            and intelligent way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Introduction Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 mb-12 sm:mb-16">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            Our platform brings together medical records, health tracking, and
            doctor collaboration into one centralized digital system, making
            healthcare more accessible and efficient for everyone.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic border-l-4 border-teal-500 pl-6">
            We believe that every individual should have easy access to their
            own medical data — not just hospitals.
          </p>
        </div>

        {/* Who We Are */}
        <section className="mb-12 sm:mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Who We Are
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Healthify is developed by a team of Computer Science students
                  at the <strong>University of Ruhuna</strong>, in collaboration
                  with healthcare professionals from the{" "}
                  <strong>Cardiology Unit, General Hospital Colombo</strong>.
                </p>
                <p>
                  Our goal is to solve real-world healthcare data problems faced
                  by patients and doctors in Sri Lanka and beyond.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-8 border-2 border-teal-200">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    University of Ruhuna CS Students
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Collaboration with General Hospital Colombo
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Real-world healthcare problem solvers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-12 sm:mb-20 bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              What We Do
            </h2>
          </div>

          <p className="text-gray-700 mb-8 text-base sm:text-lg">
            Healthify allows users to:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-teal-50 transition">
              <FileText className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Medical Records Storage
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Securely upload and store medical reports and prescriptions
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-teal-50 transition">
              <Activity className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Health Data Entry
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Enter personal health data such as height, weight, and vital
                  signs
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-teal-50 transition">
              <BarChart3 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Auto Analysis
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Automatically calculate BMI and analyze health trends
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-teal-50 transition">
              <BarChart3 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Visual Dashboards
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  View results through interactive charts and visual dashboards
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-teal-50 transition">
              <Bell className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Smart Reminders
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Set medicine and appointment reminders
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl hover:bg-teal-50 transition">
              <Share2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Secure Sharing
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Share medical data with doctors with full permission control
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-gray-700 text-sm sm:text-base">
              <strong>For Doctors:</strong> Securely view patient records and
              analysis only after receiving authorization from the patient.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-12 sm:mb-20">
          <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-10 h-10 sm:w-12 sm:h-12" />
              <h2 className="text-2xl sm:text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed">
              To empower patients with digital access, understanding, and
              control over their health data while enabling doctors to make
              better decisions through accurate, organized, and visualized
              medical information.
            </p>
          </div>
        </section>

        {/* Why Healthify */}
        <section className="mb-12 sm:mb-20 bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Why Healthify?
            </h2>
          </div>

          <p className="text-gray-700 mb-8 text-base sm:text-lg">
            Healthify is built to solve common healthcare challenges:
          </p>

          <div className="space-y-4">
            {[
              "No more scattered medical records – everything in one place",
              "Better health awareness through graphs and analytics",
              "Secure data sharing between patients and doctors",
              "Reduced paperwork and repeated tests",
              "Improved medication adherence with reminders",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-green-50 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-base sm:text-lg">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 border-2 border-gray-200 p-6 rounded-xl flex items-start gap-4">
            <Lock className="w-8 h-8 text-teal-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                Security First
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All health data is protected using secure authentication,
                encryption, and controlled access.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="mb-12 sm:mb-20">
          <div className="bg-gradient-to-br from-[#86C443] to-[#18AAB0] text-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12" />
              <h2 className="text-2xl sm:text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              We envision a future where:
            </p>
            <div className="space-y-4 pl-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base sm:text-lg">
                  Patients manage their healthcare digitally
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base sm:text-lg">
                  Doctors have quick, reliable access to patient history
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base sm:text-lg">
                  Hospitals, devices, and health platforms are connected through
                  one secure system
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/30">
              <p className="text-lg sm:text-xl font-semibold">
                Healthify aims to become a national-level digital health
                platform supporting patients, doctors, and healthcare
                institutions.
              </p>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition transform hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition transform hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition transform hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Healthify. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            Your health, your control.
          </p>
        </div>
      </footer> */}
    </div>
  );
}
