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
  SURGERIES: "surgeries",
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
    surgeries: 0,
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

    const [lab, pres, clinic, surg, custom] = await Promise.allSettled([
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
      loadFromStorage(userId, CATEGORIES.SURGERIES),
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
    if (surg.status === "rejected") {
      console.error("Failed to load surgery counts", surg.reason);
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
      surgeries:
        surg.status === "fulfilled" && Array.isArray(surg.value)
          ? surg.value.length
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
      icon: "🧪",
      color: "bg-blue-100",
    },
    {
      id: CATEGORIES.PRESCRIPTIONS,
      title: "Prescriptions",
      count: counts.prescriptions,
      icon: "💊",
      color: "bg-green-100",
    },
    // { id: CATEGORIES.VACCINES, title: "Vaccines", count: vaccines.length, icon: "💉", color: "bg-purple-100" },
    {
      id: CATEGORIES.CLINIC_BOOK,
      title: "Clinic Book",
      count: counts.clinicBook,
      icon: "📋",
      color: "bg-orange-100",
    },
    {
      id: CATEGORIES.SURGERIES,
      title: "Surgeries",
      count: counts.surgeries,
      icon: "🩺",
      color: "bg-red-100",
    },
    {
      id: CATEGORIES.CUSTOM,
      title: "Doctor Notes",
      count: counts.customFolders,
      icon: "📝",
      color: "bg-purple-100",
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
          <h1 className="text-3xl font-bold mb-6">Medical Reports</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => (
              <div
                key={c.id}
                className={`${c.color} p-6 h-[240px] relative rounded-xl shadow flex flex-col`}
              >
                <div className="text-4xl">{c.icon}</div>
                <h3 className="text-xl font-bold mt-2">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.count} items</p>

                <button
                  onClick={() => goToCategory(c.id)}
                  className="mt-4 w-full items-center justify-center bg-secondary/90 hover:bg-secondary text-white py-2 rounded-lg mt-[50px]"
                >
                  View Files
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
