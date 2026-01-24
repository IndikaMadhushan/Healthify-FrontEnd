import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { clinicBooks } from "../ClinicBookCollection/clinicBooks";
import { PatinetNavBar } from "../../../components/PatientNavBar";
import ClinicPrescriptionList from "./ClinicPrescriptionList";

export default function ClinicBookPrescriptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = clinicBooks.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Clinic Book not found
      </div>
    );
  }

  return (
    <>
      <PatinetNavBar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT – CLINIC BOOK CARD */}
          <div className="lg:col-span-1">
            <div
              className="
                bg-white rounded-3xl border border-gray-200
                shadow-lg p-6
                hover:shadow-xl transition
              "
            >
              {/* HEADER */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#86c443] to-[#18AAB0] shadow-md">
                  <BookOpen className="text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Clinic Book
                  </h2>
                  <p className="text-sm text-gray-500">
                    Personal medical record
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="text-xs text-gray-500">Doctor</p>
                  <p className="font-semibold">Dr. {book.doctorName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">SLMC Number</p>
                  <p className="font-medium">{book.doctorNo}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Specialization</p>
                  <p className="font-medium">{book.specialization}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Medication Purpose</p>
                  <p className="font-medium text-[#18AAB0]">
                    {book.medicationPurpose}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Access</p>
                  <span
                    className={`
                      inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        book.access === "Access All"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {book.access}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – PRESCRIPTIONS */}
          <div className="lg:col-span-2">
            <div
              className="
                bg-white rounded-3xl border border-gray-200
                shadow-lg p-6
              "
            >
              <ClinicPrescriptionList />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}