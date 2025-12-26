//thathsara
// Reusable layout with fixed header, content area, and footer
import React from "react";
import Header from "../pages/HomePage/Header";
import Footer from "./footer";
import AnimatedRegistrationImage from "./AnimatedRegistrationImage";

export default function RegistrationLayout({
  children,
  image,
  imageAlt = "Registration",
  gradientFrom,
  gradientTo,
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            {/* Form Area - Left Side */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 lg:max-w-xl mx-auto w-full">
              {children}
            </div>

            {/* Animated Image Area - Right Side */}
            {image && (
              <AnimatedRegistrationImage
                src={image}
                alt={imageAlt}
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
