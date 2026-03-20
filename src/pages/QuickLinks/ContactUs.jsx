import { useState, useEffect } from "react";
import { Send, CheckCircle } from "lucide-react";
import PageHelmet from "../../components/PageHelmet";
import { submitContactUsApi } from "../../api/ContactUsApi";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setFormError("");
    if (!validateForm()) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      setIsLoading(true);
      await submitContactUsApi(payload);

      setErrors({});
      setFormError("");
      setFormData(EMPTY_FORM);
      setIsSubmitted(true);

      window.setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      const responseData = error.response?.data;
      const backendErrors = responseData?.errors;

      if (
        error.response?.status === 400 &&
        backendErrors &&
        typeof backendErrors === "object"
      ) {
        setErrors({
          name: backendErrors.name || "",
          email: backendErrors.email || "",
          message: backendErrors.message || "",
        });
        setFormError("");
      } else {
        setErrors({});
        setFormError(responseData?.message || "Failed to send contact message");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (formError) setFormError("");
  };

  return (
    <>
      <PageHelmet
        title="Contact Healthify | Support and Inquiries"
        description="Contact the Healthify team for support, product questions, and healthcare platform inquiries through our secure contact page."
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-green-500 text-white py-16 sm:py-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              Have questions about Healthify? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
              <div className="text-center mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-sm text-gray-600">
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Thank you. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2.5 text-sm border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] mt-1 uppercase">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-2.5 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] mt-1 uppercase">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+94 123 456"
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry Subject"
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {formError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-sm text-red-600">{formError}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="How can we help?"
                      className={`w-full px-4 py-2.5 text-sm border ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition resize-none`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-[10px] mt-1 uppercase">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-teal-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-teal-600 transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
