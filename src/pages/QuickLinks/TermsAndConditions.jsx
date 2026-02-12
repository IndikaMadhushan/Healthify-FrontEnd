import React, { useEffect } from "react";

export default function TermsConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Terms & Conditions
              </h1>
            </div>

            <div className="text-left md:text-right">
              <p className="text-[11px] text-gray-400">
                Last Revised: October 2023
              </p>
              <p className="text-[11px] text-gray-400">
                Effective: Upon Deployment
              </p>
              <p className="text-[11px] text-gray-400">Version: 1.0.0</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        <main className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 shadow-sm">
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              Welcome to Healthify. These Terms & Conditions govern your use of
              our website and personal health monitoring services. By accessing
              or using Healthify, you acknowledge that you have read,
              understood, and agree to be bound by these terms. If you do not
              agree, please discontinue use of the platform immediately.
            </p>
          </section>

          {/* 1. User Responsibilities */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              1. User Responsibilities
            </h2>

            <div className="text-[13px] sm:text-sm text-gray-600 space-y-4">
              <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
                As a user of Healthify, you agree to provide accurate and
                complete personal and medical information to ensure reliable
                health insights. You are responsible for maintaining the
                confidentiality of your account credentials and must promptly
                report any suspected unauthorized access. Additionally, users
                are expected to use the platform responsibly and only for lawful
                purposes, avoiding any activity that may disrupt system
                functionality or compromise platform security.
              </p>
            </div>
          </section>

          {/* 2. Medical Disclaimer */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              2. Medical Content Disclaimer
            </h2>

            <div className="bg-gray-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-[12px] sm:text-[13px] text-red-600 font-semibold italic">
                Important: Healthify is a data management tool, not a medical
                provider.
              </p>
            </div>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              All charts, health stats, and summaries provided by the system are
              for informational purposes only. Our platform is not a substitute
              for professional medical advice, diagnosis, or treatment. Always
              seek the advice of your physician or other qualified health
              provider with any questions regarding a medical condition.
            </p>
          </section>

          {/* 3. Doctor Access */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              3. Doctor Access & Permissions
            </h2>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              Healthify facilitates data sharing between users and medical
              professionals.
              <strong> You maintain full control</strong> over who can view your
              medical history. Doctors can only access your records after you
              explicitly grant permission through the platform, and you may
              revoke this access at any time.
            </p>
          </section>

          {/* 4. Proprietary Rights */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              4. Proprietary Rights
            </h2>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              The Healthify platform, including its design, source code,
              analytical models, and trademarks, is the exclusive property of
              the Group 2 development team at the University of Ruhuna. You may
              not reproduce, distribute, or modify any part of the system
              without prior written consent.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              5. Limitation of Liability
            </h2>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              To the maximum extent permitted by law, Healthify shall not be
              liable for any indirect, incidental, or consequential damages
              resulting from the use of the service. This includes reliance on
              health analytics, data loss, or medical outcomes based on
              information managed within the platform.
            </p>
          </section>

          {/* 6. Indemnification */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              6. Indemnification
            </h2>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless Healthify and its
              developers from any claims, damages, or legal fees arising from
              your violation of these Terms, your misuse of the platform, or any
              fraudulent activity conducted through your account.
            </p>
          </section>

          {/* 7. Service Availability */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              7. Service Availability
            </h2>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              We do not guarantee 100% uninterrupted access to the platform.
              Healthify is not responsible for service failures caused by
              factors beyond our control, including internet outages, server
              maintenance, or external cyber-attacks.
            </p>
          </section>

          {/* 8. Governing Law */}
          <section className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
              8. Governing Law
            </h2>

            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of
              <strong> Sri Lanka</strong>. Any disputes arising from these terms
              shall be subject to the exclusive jurisdiction of the courts of
              Sri Lanka.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
