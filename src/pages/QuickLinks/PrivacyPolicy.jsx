import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [openIndex, setOpenIndex] = useState(null); // First item open by default

  const sections = [
    {
      title: "Information We Collect",
      content: (
        <div className="space-y-3">
          <p>We may collect the following data:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personal details (Name, Age, Height, Weight, Gender)</li>
            <li>Uploaded medical reports & prescriptions</li>
            <li>
              Manually entered health statistics (sugar levels, heart rate, BMI
              inputs, etc.)
            </li>
            <li>Account login information (email, password — encrypted)</li>
            <li>
              Medicine reminders, activity logs, doctor access permissions
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "How We Use Your Data",
      content: (
        <div className="space-y-3">
          <p>Your data may be used to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Generate health analytics & visualizations (BMI charts, glucose
              trends)
            </li>
            <li>Manage your health records & personal dashboard</li>
            <li>Send medication reminders & health notifications</li>
            <li>Share medical reports only with doctors you approve</li>
            <li>Improve system performance & user experience</li>
          </ul>
          <p className="mt-3 font-medium">
            We do not sell or share personal medical data with third parties
            without permission.
          </p>
        </div>
      ),
    },
    {
      title: "Data Protection & Security",
      content: (
        <div className="space-y-3">
          <p>We ensure that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Data is encrypted & stored securely in the database</li>
            <li>Only authenticated users can access medical history</li>
            <li>Doctor access is controlled by you — the patient</li>
            <li>Regular backups are maintained for data safety</li>
          </ul>
        </div>
      ),
    },
    {
      title: "User Control & Rights",
      content: (
        <div className="space-y-3">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>View, update, or delete your personal data</li>
            <li>Revoke doctor access anytime</li>
            <li>Request account closure and data removal</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Data Sharing Policy",
      content: (
        <div className="space-y-4">
          <p>We share data only under these conditions:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mt-3">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Condition
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                    Shared With
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    User grants permission
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Authorized doctor only
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Legal requirements
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Government or legal authority
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: "Future Integrations",
      content: (
        <p>
          Future versions may include wearable device data, hospital API
          connections, and AI analysis — fully privacy-compliant.
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
            PRIVACY POLICY
          </p> */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
            This Privacy Policy explains how Healthify collects, uses, stores,
            and protects personal health information of users.
          </p>
          {/* <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
            <strong>Effective Date:</strong> Upon deployment
          </p> */}
        </div>
      </div>

      {/* Policy Sections */}
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
            Have concerns about your privacy?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            If you have any questions about this Privacy Policy, please contact
            our support team.
          </p>
          <button className="bg-teal-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
