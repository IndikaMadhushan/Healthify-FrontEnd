import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null); // Second item open by default

  const faqs = [
    {
      question: "What is Healthify?",
      answer:
        "Healthify is a Personal Healthcare Monitoring System that allows users to store, manage, and analyze medical records in one secure online platform.",
    },
    {
      question: "Who can use the system?",
      answer:
        "Patients and Doctors. Patients can upload medical reports, track health data, and set reminders, while doctors can view patient records after receiving access.",
    },
    {
      question: "Can I upload medical reports and prescriptions?",
      answer:
        "Yes. You can upload reports in PDF or image format and store them securely for future reference.",
    },
    {
      question: "How does the system help me track my health?",
      answer:
        "Healthify generates analytical charts for BMI, glucose levels, heart rate and other medical indicators — helping you track progress over time.",
    },
    {
      question: "Will doctors be able to see my health data?",
      answer:
        "Only if you grant access. Your data remains private unless you permit a doctor to view it.",
    },
    {
      question: "Can I get reminders to take my medication?",
      answer:
        "Yes. You can set medicine schedules and the system will notify you when it's time.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. We use encryption, authentication and restricted access control to ensure privacy of patient medical data.",
    },
    {
      question: "Can I access the system on mobile/web?",
      answer:
        "The system is web-based and accessible on any device with internet connectivity.",
    },
    {
      question: "Does Healthify provide diagnosis or treatment?",
      answer:
        "No. The system provides analytics & record management — medical decisions should be made by qualified doctors.",
    },
    {
      question: "What features will be added in the future?",
      answer:
        "AI-health prediction, hospital API integration, multilingual support, wearable device sync and more.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          {/* <p className="text-teal-600 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-wide">
            FAQS
          </p> */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
            Find quick answers to the most common questions about our services,
            treatments, and patient care. We're here to make things simple and
            clear for you.
          </p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start sm:items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-medium text-gray-900 pr-4 leading-snug sm:leading-normal">
                  {faq.question}
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
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
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
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Can't find the answer you're looking for? Please reach out to our
            support team.
          </p>
          <button className="bg-teal-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
