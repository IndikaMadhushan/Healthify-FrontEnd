import { useEffect } from "react";
import PageHelmet from "../../components/PageHelmet";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHelmet
        title="Privacy Policy | Healthify"
        description="Read the Healthify Privacy Policy to understand how personal information and health data are collected, stored, protected, and shared."
      />
      <div className="min-h-screen bg-[#F9FAFB] pb-20">
        {/* Hero Section */}
        <header className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Privacy Policy
                </h1>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[11px] text-gray-400">
                  Effective Date: November 12, 2025
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
                This Privacy Policy describes how <strong>Healthify</strong>{" "}
                collects, uses, and discloses your Personal Information when you
                visit or use our health monitoring platform. By using this
                service, you agree to the collection and use of information in
                accordance with this policy.
              </p>
            </section>

            {/* 1. Information Collection */}
            <section className="mb-8 pt-6 border-t border-gray-100">
              <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
                1. Information We Collect
              </h2>
              <div className="text-[13px] sm:text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  We collect several different types of information for various
                  purposes to provide and improve our Service to you:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>
                      <strong>Personal Identification:</strong> Name, age,
                      gender, s contact detail,etc.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>
                      <strong>Health Data:</strong> Medical reports, vital signs
                      (BMI, heart rate), and prescriptions.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>
                      <strong>Usage Data:</strong> Log data, IP addresses, and
                      device information.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. Data Usage */}
            <section className="mb-8 pt-6 border-t border-gray-100">
              <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
                2. How We Use Your Data
              </h2>
              <div className="text-[13px] sm:text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  The collected data is used for the following specific
                  operations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <p>Maintaining health dashboards</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <p>Providing clinical analytics</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <p>Sending medical reminders</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <p>Securing doctor-patient portals</p>
                  </div>
                </div>
                <div className="bg-gray-50 border-l-4 border-red-500 p-4 mb-4">
                  <p className="text-[12px] sm:text-[13px] text-red-600 font-semibold italic">
                    Healthify does not trade, sell, or rent user medical data to
                    any marketing agencies or third-party insurers.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Data Protection */}
            <section className="mb-8 pt-6 border-t border-gray-100">
              <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
                3. Data Protection & Security
              </h2>
              <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
                The security of user data is a top priority in the Healthify
                system. We implement appropriate administrative and technical
                measures to protect personal and medical information from
                unauthorized access, loss, or misuse. The system uses secure
                authentication mechanisms and Role-Based Access Control (RBAC)
                to ensure that only authorized users (patients, doctors, and
                administrators) can access relevant data. All sensitive
                information is stored securely within the system, and access is
                restricted based on user roles. While we strive to use
                industry-standard practices to safeguard data, no method of
                transmission over the Internet is completely secure.
              </p>
            </section>

            {/* 4. Data Sharing Table */}
            <section className="mb-8 pt-6 border-t border-gray-100">
              <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">
                4. Third-Party Disclosure
              </h2>
              <div className="overflow-hidden border border-gray-200 rounded-md mt-4">
                <table className="w-full text-left text-[12px] sm:text-[13px] border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-semibold text-gray-700">
                        Entity
                      </th>
                      <th className="p-3 font-semibold text-gray-700">
                        Reason for Sharing
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    <tr>
                      <td className="p-3 font-medium">Verified Doctors</td>
                      <td className="p-3">Only via SLMC verification.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Legal Authorities</td>
                      <td className="p-3">
                        Only when required by Sri Lankan law.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
