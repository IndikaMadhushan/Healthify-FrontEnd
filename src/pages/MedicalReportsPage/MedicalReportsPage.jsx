//last edit by thathsara
// MedicalReportsPage.jsx (COMPLETE CODE)
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

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

  const role = localStorage.getItem("role"); // "DOCTOR" | "PATIENT"
  const userId = "user_123"; // replace later with auth user id

  const [loading, setLoading] = useState(true);

  const [labReports, setLabReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [clinicBook, setClinicBook] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [customFolders, setCustomFolders] = useState([]);

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

  const loadAllData = useCallback(async () => {
    setLoading(true);
    const [lab, pres, vacc, clinic, surg, custom] = await Promise.all([
      loadFromStorage(userId, CATEGORIES.LAB_REPORTS),
      loadFromStorage(userId, CATEGORIES.PRESCRIPTIONS),
      loadFromStorage(userId, CATEGORIES.VACCINES),
      loadFromStorage(userId, CATEGORIES.CLINIC_BOOK),
      loadFromStorage(userId, CATEGORIES.SURGERIES),
      loadFromStorage(userId, CATEGORIES.CUSTOM),
    ]);

    setLabReports(lab);
    setPrescriptions(pres);
    setVaccines(vacc);
    setClinicBook(clinic);
    setSurgeries(surg);
    setCustomFolders(custom);

    setLoading(false);
  }, [userId]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

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
        alert("Patient not selected");
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
      count: labReports.length,
      icon: "🧪",
      color: "bg-blue-100",
    },
    {
      id: CATEGORIES.PRESCRIPTIONS,
      title: "Prescriptions",
      count: prescriptions.length,
      icon: "💊",
      color: "bg-green-100",
    },
    // { id: CATEGORIES.VACCINES, title: "Vaccines", count: vaccines.length, icon: "💉", color: "bg-purple-100" },
    {
      id: CATEGORIES.CLINIC_BOOK,
      title: "Clinic Book",
      count: clinicBook.length,
      icon: "📋",
      color: "bg-orange-100",
    },
    {
      id: CATEGORIES.SURGERIES,
      title: "Surgeries",
      count: surgeries.length,
      icon: "🩺",
      color: "bg-red-100",
    },
    {
      id: CATEGORIES.CUSTOM,
      title: "Doctor Notes",
      count: customFolders.length,
      icon: "📝",
      color: "bg-purple-100",
    },
  ];

  const location = useLocation();

  // if path is exactly /medical-reports OR /doctor/:id/medical-reports
  const isRootMedicalReports = location.pathname.endsWith("/medical-reports");

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
                <p className="text-sm text-gray-600">{c.count} files</p>

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
