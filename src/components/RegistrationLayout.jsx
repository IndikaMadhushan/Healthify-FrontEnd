//thathsara
// Reusable layout with fixed header, content area, and footer
import React from "react";
import Header from "../pages/HomePage/Header";
import Footer from "./footer";

export default function RegistrationLayout({
  children,
  image,
  imageAlt = "Registration",
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

            {/* Image Area - Right Side */}
            {image && (
              <div className="hidden lg:flex justify-center items-start lg:sticky lg:top-24">
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
                  <img
                    src={image}
                    alt={imageAlt}
                    className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                    style={{ maxHeight: "80vh" }}
                  />
                </div>
              </div>
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
