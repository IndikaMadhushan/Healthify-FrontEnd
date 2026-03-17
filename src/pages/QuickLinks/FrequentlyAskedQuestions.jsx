import React, { useState, useEffect } from "react";
import { Plus, Minus, MessageCircle, Mail } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "What is Healthify?",
      answer:
        "Healthify is a Personal Healthcare Monitoring System that allows users to store, manage, and analyze medical records in one secure online platform.",
    },
    {
      question: "Who can use the system?",
      answer:
        "Patients and Doctors. Patients can upload medical reports, track health data, and set reminders, while doctors can view patient records.",
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
        "Only if you add a doctor. Your data remains private unless you add a doctor.",
    },
    {
      question: "Can I get reminders to take my medication?",
      answer:
        "Yes. You can set medicine schedules and the system will notify you through emails when it's time.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. We use encryption, authentication and restricted access control to ensure privacy of patient medical data.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200 py-12 sm:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[5%] w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-[10%] -left-[5%] w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                Need help using{" "}
                <span className="text-teal-600"> Healthify?</span>
              </h1>

              <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                Find answers regarding your medical data security, report
                management, and how to effectively use our health tracking
                tools.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Data Security", detail: "Encryption & Privacy" },
                { label: "Medical Records", detail: "Uploads & Storage" },
                { label: "Health Insights", detail: "BMI & Analytics" },
                { label: "Smart Alerts", detail: "Medicine Reminders" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-teal-200 transition-colors"
                >
                  <p className="text-[10px] font-bold text-teal-600 uppercase mb-1 tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </span>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-125 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-5 sm:px-6 pb-6 text-gray-600">
                  <div className="h-px bg-gray-100 mb-4"></div>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
            <MessageCircle className="w-6 h-6 text-teal-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Still can't find what you're looking for?
          </h3>

          <p className="text-gray-600 mb-6">
            Our team will do our best to respond to your inquiries as soon as
            possible.{" "}
          </p>

          {/* Email Support Button */}
          <a
            href="mailto:healthify@gmail.com?subject=Healthify Support Request&body=Hello Healthify Team,"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700 transition-all shadow-md active:scale-95"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}
