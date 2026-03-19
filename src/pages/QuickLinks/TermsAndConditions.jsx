import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function TermsConditionsPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Healthify</title>
        <meta
          name="description"
          content="Review the Healthify Terms and Conditions covering platform use, user responsibilities, data practices, and medical service disclaimers."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Terms and Conditions
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Last Updated: February 2026
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-base text-gray-700 leading-relaxed font-semibold mb-4">
                In using this website you are deemed to have read and agreed to
                the following terms and conditions:
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and any or all
                Agreements. "Client", "You" and "Your" refers to you, the person
                accessing this website and accepting the Company's terms and
                conditions. "The Company", "Ourselves", "We" and "Us", refers to
                Healthify. "Party", "Parties", or "Us", refers to both the
                Client and ourselves, or either the Client or ourselves. All
                terms refer to the offer, acceptance and consideration of
                payment necessary to undertake the process of our assistance to
                the Client in the most appropriate manner, whether by formal
                meetings of a fixed duration, or any other means, for the
                express purpose of meeting the Client's needs in respect of
                provision of the Company's stated services/products, in
                accordance with and subject to, prevailing English Law. Any use
                of the above terminology or other words in the singular, plural,
                capitalisation and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </p>
            </div>

            {/* Privacy Statement */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Privacy Statement
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We are committed to protecting your privacy. Authorized
                employees within the company on a need to know basis only use
                any information collected from individual customers. We
                constantly review our systems and data to ensure the best
                possible service to our customers. Parliament has created
                specific offences for unauthorised actions against computer
                systems and data. We will investigate any such actions with a
                view to prosecuting and/or taking civil proceedings to recover
                damages against those responsible.
              </p>
            </section>

            {/* Confidentiality */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Confidentiality
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We are registered under the Data Protection Act 1998 and as
                such, any information concerning the Client and their respective
                Client Records may be passed to third parties. However, Client
                records are regarded as confidential and therefore will not be
                divulged to any third party, other than our healthcare providers
                and partners, if legally required to do so to the appropriate
                authorities. Clients have the right to request sight of, and
                copies of any and all Client Records we keep, on the proviso
                that we are given reasonable notice of such a request. Clients
                are requested to retain copies of any literature issued in
                relation to the provision of our services. Where appropriate, we
                shall issue Client's with appropriate written information,
                handouts or copies of records as part of an agreed contract, for
                the benefit of both parties.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                We will not sell, share, or rent your personal information to
                any third party or use your e-mail address for unsolicited mail.
                Any emails sent by this Company will only be in connection with
                the provision of agreed services and products.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Disclaimer
              </h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Exclusions and Limitations
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                The information on this web site is provided on an "as is"
                basis. To the fullest extent permitted by law, this Company:
              </p>

              <ul className="list-disc pl-6 mb-4 space-y-2 text-sm text-gray-600">
                <li>
                  excludes all representations and warranties relating to this
                  website and its contents or which is or may be provided by any
                  affiliates or any other third party, including in relation to
                  any inaccuracies or omissions in this website and/or the
                  Company's literature; and
                </li>
                <li>
                  excludes all liability for damages arising out of or in
                  connection with your use of this website. This includes,
                  without limitation, direct loss, loss of business or profits
                  (whether or not the loss of such profits was foreseeable,
                  arose in the normal course of things or you have advised this
                  Company of the possibility of such potential loss), damage
                  caused to your computer, computer software, systems and
                  programs and the data thereon or any other direct or indirect,
                  consequential and incidental damages.
                </li>
              </ul>

              <p className="text-sm text-gray-600 leading-relaxed">
                This Company does not however exclude liability for death or
                personal injury caused by its negligence. The above exclusions
                and limitations apply only to the extent permitted by law. None
                of your statutory rights as a consumer are affected.
              </p>
            </section>

            {/* Medical Disclaimer */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Medical Disclaimer
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Healthify is designed for health tracking and data organization
                only. It does not replace professional medical diagnosis or
                emergency care.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Charts, analytics, and summaries generated are informational.
                All treatment decisions should be made by certified medical
                professionals. The platform should not be used as a substitute
                for professional medical advice, diagnosis, or treatment.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                User Responsibilities
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                By creating an account in Healthify, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>
                  Provide accurate health information for reliable analytics
                </li>
                <li>Keep login credentials secure and confidential</li>
                <li>Use the platform ethically and legally</li>
                <li>Not misuse or attempt to hack the system</li>
                <li>Not share your account with unauthorized individuals</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            {/* Doctor Access & Permissions */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Doctor Access & Permissions
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>Doctors can view patient data </li>
                <li>
                  Healthcare providers must comply with all applicable medical
                  privacy laws
                </li>
                <li>
                  All data sharing is subject to applicable healthcare
                  regulations including HIPAA where applicable
                </li>
              </ul>
            </section>

            {/* Data Usage & Copyright */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Data Usage & Copyright
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>
                  All system content, design, and analytics models are property
                  of the Healthify development team
                </li>
                <li>
                  Users cannot reproduce, sell, or distribute system assets
                  without written permission
                </li>
                <li>
                  Your health data remains your property, but you grant us
                  license to process it to provide our services
                </li>
                <li>
                  We may use anonymized, aggregated data for research and
                  improving our services
                </li>
              </ul>
            </section>

            {/* Account Suspension & Misuse */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Account Suspension & Misuse
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We reserve the right to suspend or terminate accounts that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>Violate data policies or terms of service</li>
                <li>Attempt unauthorized access to system resources</li>
                <li>Upload fraudulent or harmful content</li>
                <li>Engage in activities that compromise system security</li>
                <li>Use the service for illegal purposes</li>
                <li>Abuse or harass other users or healthcare providers</li>
              </ul>
            </section>

            {/* Modification of Terms */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Modification of Terms
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Healthify may update these terms as the system evolves. We will
                notify users of significant changes via email or in-app
                notification. Continued usage after such modifications
                constitutes acceptance of the updated policies. We encourage you
                to review these terms periodically.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Governing Law
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of the jurisdiction in which Healthify
                operates. Any disputes relating to these terms and conditions
                will be subject to the exclusive jurisdiction of the courts of
                that jurisdiction.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                If you have any questions about these Terms and Conditions,
                please contact our support team through the Contact Support
                button below or via the Contact Us section.
              </p>
            </section>
          </div>
        </div>

        {/* Footer CTA Section */}
        {/* Support Section */}
        <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
            //<MessageCircle className="w-6 h-6 text-teal-600" />
          </div> */}

          {/* <h3 className="text-xl font-bold text-gray-900 mb-2">
            Still can't find what you're looking for?
          </h3> */}

          <p className="text-gray-600 mb-6">
            Our team will do our best to respond to your inquiries as soon as
            possible.{" "}
          </p>

          {/* Email Support Button */}
          <a
            href="mailto:healthify@gmail.com?subject=Healthify Support Request&body=Hello Healthify Team,"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700 transition-all shadow-md active:scale-95"
          >
            Email Support
          </a>
        </div>
      </div>
    </>
  );
}
