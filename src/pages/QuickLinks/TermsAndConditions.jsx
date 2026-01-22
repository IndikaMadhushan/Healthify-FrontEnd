import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function TermsConditionsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: "Acceptance of Terms",
      content: (
        <p>
          By creating an account in Healthify, you agree to follow these Terms &
          Conditions.
        </p>
      ),
    },
    {
      title: "User Responsibilities",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide accurate health information for reliable analytics</li>
          <li>Keep login credentials secure</li>
          <li>Use the platform ethically and legally</li>
          <li>Not misuse or attempt to hack the system</li>
        </ul>
      ),
    },
    {
      title: "System Purpose & Limitations",
      content: (
        <p>
          Healthify is designed for health tracking and data organization only.
          It does not replace professional medical diagnosis or emergency care.
        </p>
      ),
    },
    {
      title: "Medical Content Disclaimer",
      content: (
        <p>
          Charts, analytics, and summaries generated are informational. All
          treatment decisions should be made by certified medical professionals.
        </p>
      ),
    },
    {
      title: "Doctor Access & Permissions",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Doctors can view patient data only after patient approval.</li>
          <li>Patients may revoke access at any time.</li>
        </ul>
      ),
    },
    {
      title: "Data Usage & Copyright",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            All system content, design & analytics models are property of the
            Healthify development team.
          </li>
          <li>
            Users cannot reproduce, sell, or distribute system assets without
            permission.
          </li>
        </ul>
      ),
    },
    {
      title: "Account Suspension & Misuse",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            We reserve the right to suspend accounts that violate data policies.
          </li>
          <li>Attempt unauthorized access.</li>
          <li>Upload fraudulent or harmful content.</li>
        </ul>
      ),
    },
    {
      title: "Modification of Terms",
      content: (
        <p>
          Healthify may update these terms as the system evolves. Continued
          usage means you accept the updated policies.
        </p>
      ),
    },
  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          {/* <p className="text-teal-600 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-wide">
            TERMS & CONDITIONS
          </p> */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
            Please read these Terms & Conditions carefully before using
            Healthify. Your use of the platform indicates your agreement.
          </p>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-3 sm:space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-start sm:items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4 leading-snug sm:leading-normal">
                  {index + 1}. {section.title}
                </span>
                <span className="flex-shrink-0 ml-2">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  ) : (
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  )}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="bg-white border-t mt-8 sm:mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
            Have questions about these terms?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            If you have any concerns, please contact our support team.
          </p>
          <button className="bg-teal-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
