import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Plus } from "lucide-react";
import { clinicBooks } from "../ClinicBookCollection/clinicBooks";
import { PatinetNavBar } from "../../../components/PatientNavBar";
import ClinicPrescriptionList from "./ClinicPrescriptionList";

export default function ClinicBookPrescriptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔐 TEMP ROLE (replace later with auth role)
  const userRole = "DOCTOR"; // "PATIENT"

  // find clinic book
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

      <div className="min-h-screen bg-gray-50 p-6 ">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* PAGE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT – CLINIC BOOK INFO */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow border p-6">

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#86c443] to-[#18AAB0]">
                  <BookOpen className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  Clinic Book
                </h2>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm text-gray-700">
                <p><b>Doctor:</b> Dr. {book.doctorName}</p>
                <p><b>SLMC:</b> {book.doctorNo}</p>
                <p><b>Specialization:</b> {book.specialization}</p>
                <p><b>Purpose:</b> {book.medicationPurpose}</p>
                <p><b>Access:</b> {book.access}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(book.lastUpdated).toLocaleDateString()}
                </p>
              </div>

              {/* DOCTOR ONLY BUTTON */}
              {userRole === "DOCTOR" && (
                <button
                  onClick={() => {navigate("/doctor-clinic-book/:patientId/:bookId")
                    // 👉 later open prescription modal
                  }}
                  className="
                    mt-6 w-full flex items-center justify-center gap-2
                    px-4 py-3 rounded-xl
                    bg-gradient-to-r from-[#86c443] to-[#18AAB0]
                    text-white font-semibold
                    shadow-md hover:shadow-lg transition
                  "
                >
                  <Plus size={18} />
                  Create Today Page
                </button>
              )}

            </div>
          </div>

          {/* RIGHT – PRESCRIPTIONS */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow border p-6">

              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Clinic Prescriptions
              </h3>

              {/* Prescription list filtered by clinicBookId */}
              <ClinicPrescriptionList clinicBookId={book.id} />

            </div>
          </div>

        </div>
      </div>
    </>
  );
}