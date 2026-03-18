//last edit by thathsara
// MedicalReportsPage.jsx (COMPLETE CODE)
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getMyLabContents, getPatientLabContents } from "../../api/LabReportApi";
import {
  getConsultCardByDoctor,
  getConsultCardByPatient,
} from "../../api/ConsultationApi";
import {
  getClinicBooksByPatientId,
  getMyClinicBooks,
} from "../../api/ClinicBookApi";

const CATEGORIES = {
  LAB_REPORTS: "lab-reports",
  PRESCRIPTIONS: "prescriptions",
  VACCINES: "vaccines",
  CLINIC_BOOK: "clinic-book",
  CUSTOM: "drnote",
};

export default function MedicalReportsPage() {
  const navigate = useNavigate();
  const { patientId } = useParams(); // 👈 IMPORTANT

  const userId = "user_123"; // replace later with auth user id

  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    labReports: 0,
    prescriptions: 0,
    clinicBook: 0,
    customFolders: 0,
  });

  const loadFromStorage = async (user, category) => {
    try {
      const result = await window.storage.list(`${user}:${category}:`, false);
      if (!result?.keys) return [];

      const items = await Promise.all(
        result.keys.map(async (key) => {
          const item = await window.storage.get(key, false);
          return item ? JSON.parse(item.value) : null;
        }),
      );

      return items.filter(Boolean);
    } catch {
      return [];
    }
  };

  const getLabItemCount = (data) => {
    const totalFiles = data?.totalFiles ?? data?.files?.length ?? 0;
    const totalFolders = data?.totalFolders ?? data?.folders?.length ?? 0;
    return totalFiles + totalFolders;
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);
    const role = localStorage.getItem("role")?.toUpperCase();
    const isDoctor = role === "DOCTOR";
    const emptyLabResponse = {
      data: { files: [], folders: [], totalFiles: 0, totalFolders: 0 },
    };
    const emptyListResponse = { data: [] };

    const [lab, pres, clinic, custom] = await Promise.allSettled([
      isDoctor
        ? patientId
          ? getPatientLabContents(patientId)
          : Promise.resolve(emptyLabResponse)
        : getMyLabContents(),
      isDoctor
        ? patientId
          ? getConsultCardByDoctor(patientId)
          : Promise.resolve(emptyListResponse)
        : getConsultCardByPatient(),
      isDoctor
        ? patientId
          ? getClinicBooksByPatientId(patientId)
          : Promise.resolve(emptyListResponse)
        : getMyClinicBooks(),
      loadFromStorage(userId, CATEGORIES.CUSTOM),
    ]);

    if (lab.status === "rejected") {
      console.error("Failed to load lab report counts", lab.reason);
    }
    if (pres.status === "rejected") {
      console.error("Failed to load prescription counts", pres.reason);
    }
    if (clinic.status === "rejected") {
      console.error("Failed to load clinic book counts", clinic.reason);
    }
    if (custom.status === "rejected") {
      console.error("Failed to load doctor note counts", custom.reason);
    }

    setCounts({
      labReports:
        lab.status === "fulfilled" ? getLabItemCount(lab.value.data) : 0,
      prescriptions:
        pres.status === "fulfilled" && Array.isArray(pres.value.data)
          ? pres.value.data.length
          : 0,
      clinicBook:
        clinic.status === "fulfilled" && Array.isArray(clinic.value.data)
          ? clinic.value.data.length
          : 0,
      customFolders:
        custom.status === "fulfilled" && Array.isArray(custom.value)
          ? custom.value.length
          : 0,
    });

    setLoading(false);
  }, [patientId, userId]);

  // ✅ SINGLE navigation function (correct)
  // const goToCategory = (categoryId) => {
  //   if (role === "DOCTOR") {
  //     if (!patientId) {
  //       alert("Patient not selected");
  //       return;
  //     }
  //     navigate(`/doctor/${patientId}/medical-reports/${categoryId}`);
  //   } else {
  //     navigate(`/patient/medical-reports/${categoryId}`);
  //   }
  // };

  const goToCategory = (categoryId) => {
    const rawRole = localStorage.getItem("role");
    const role = rawRole?.toUpperCase();
    if (role === "DOCTOR") {
      if (!patientId) {
        toast.error("Patient not selected");
        return;
      }
      navigate(`/doctor/${patientId}/medical-reports/${categoryId}`);
    }
    if (role === "PATIENT") {
      navigate(`/patient/medical-reports/${categoryId}`);
    }
  };

  const categories = [
    {
      id: CATEGORIES.LAB_REPORTS,
      title: "Lab Reports",
      count: counts.labReports,
      icon: "📚",
      color: "bg-blue-100",
      text:"Access and manage all  laboratory test results, including blood tests, scans, and reports"
    },
    {
      id: CATEGORIES.PRESCRIPTIONS,
      title: "Prescriptions",
      count: counts.prescriptions,
      icon: "💊",
      color: "bg-green-100",
      text:"View and manage all digital medical prescriptions, including medications and dosages "
    },
    // { id: CATEGORIES.VACCINES, title: "Vaccines", count: vaccines.length, icon: "💉", color: "bg-purple-100" },
    {
      id: CATEGORIES.CLINIC_BOOK,
      title: "Clinic Book",
      count: counts.clinicBook,
      icon: "📋",
      color: "bg-orange-100",
      text:"Keep a complete record of clinic visits, including doctor notes and treatments"
      },
    // {
    //   id: CATEGORIES.SURGERIES,
    //   title: "Surgeries",
    //   count: counts.surgeries,
    //   icon: "🩺",
    //   color: "bg-red-100",
    // },
    {
      id: CATEGORIES.CUSTOM,
      title: "Doctor Notes",
      count: counts.customFolders,
      icon: "🩺",
      color: "bg-purple-100",
      text:"Store and review all doctor notes, including advice and observations"
    },
  ];

  const location = useLocation();

  // if path is exactly /medical-reports OR /doctor/:id/medical-reports
  const isRootMedicalReports = location.pathname.endsWith("/medical-reports");

  useEffect(() => {
    if (!isRootMedicalReports) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      void loadAllData();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isRootMedicalReports, loadAllData]);

  if (loading) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }
  return (
    <div className="p-6">
      {/* ✅ SHOW CARDS ONLY ON ROOT */}
      {isRootMedicalReports && (
        <div>
          {/* <h1 className="text-3xl font-bold mb-6">Medical Reports</h1> */}

          <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0F4F52] mb-2">
                        Medical Reports🧬
                    </h1>
                    <p className="text-gray-600">
                        Manage your Medical data here
                    </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {categories.map((c) => (
              <div
                key={c.id}
                className={`
                  ${c.color}
                  min-h-[280px] rounded-2xl
                  p-6 flex flex-col items-center text-center
                  border border-white/40
                  shadow-md hover:shadow-2xl
                  transition-all duration-300 hover:-translate-y-2
                  relative overflow-hidden group
                `}
              >
                {/* subtle top highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/40 opacity-50"></div>

                {/* ICON */}
                <div className="md:text-7xl text-6xl mb-4 transform group-hover:scale-110 transition duration-300">
                  {c.icon}
                </div>

                {/* TITLE */}
                <h3 className="md:text-xl text-lg font-bold text-gray-800">
                  {c.title}
                </h3>

                {/* COUNT */}
                <p className="text-md font-semibold text-gray-600 mt-1 mb-4">
                  {c.count} items
                </p>

              {/* COUNT */}
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  {c.text} 
                </p>
                {/* BUTTON */}
                <button
                  onClick={() => goToCategory(c.id)}
                  className="
                    mt-auto w-full py-2 rounded-lg
                    bg-secondary/90 hover:bg-secondary
                    text-white font-medium
                    shadow-sm hover:shadow-md
                    transition-all duration-200
                  "
                >
                  View Files →
                </button>
              </div>
              
              
            ))}
          </div>
        </div>
      )}

      {/* ✅ CHILD ROUTES RENDER HERE */}
      <Outlet />
    </div>
  );
}
