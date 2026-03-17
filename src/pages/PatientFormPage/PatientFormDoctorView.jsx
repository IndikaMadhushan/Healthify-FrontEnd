import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import BasicInfoForm from "./FormComponent/basicInfoForm";
import EmergencyContactForm from "./FormComponent/Emergency";
import HabitsAndAllergiesForm from "./FormComponent/HabitsAndAllergiesForm";
import MedicalHistoryForm from "./FormComponent/MedicalHistoryForm";
import ParentMedicalForm from "./FormComponent/ParentMediInfo";
import {
  getAllPatients,
  getPatientMedicalInfoApi,
  getPatientProfileByIdApi,
} from "../../api/PatientApi";

import { MdDataset } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { GiLifeBar } from "react-icons/gi";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { MdPlaylistPlay } from "react-icons/md";

const DEFAULT_PATIENT_PROFILE = {
  firstName: "",
  secondName: "",
  lastName: "",
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  occupation: "",
  address: "",
  district: "",
  phone: "",
  email: "",
  nic: "",
  primaryContact: {
    name: "",
    phoneNumber: "",
    relationship: "",
  },
  secondaryContact: {
    name: "",
    phoneNumber: "",
    relationship: "",
  },
};

const DEFAULT_MEDICAL_INFO_STATE = {
  medicalInfo: {
    chronic: {
      chronicIllnesses: [],
      otherChronic: "",
      cancerChronic: "",
    },
    vaccines: {
      takenVaccines: [],
      otherVaccine: "",
    },
    surgeries: [],
  },
  lifestyleAndAllergies: {
    smokingStatus: "",
    smokingFrequency: "",
    alcoholStatus: "",
    alcoholFrequency: "",
    drugUseStatus: "",
    drugUseFrequency: "",
    stressLevel: "",
    foodAllergies: "",
    drugAllergies: "",
  },
  parentMedicalInfo: {
    chronicIllnesses: [],
    otherChronic: "",
  },
};

const normalizeMedicalInfoResponse = (data) => ({
  medicalInfo: {
    chronic: {
      chronicIllnesses: Array.isArray(
        data?.medicalInfo?.chronic?.chronicIllnesses
      )
        ? data.medicalInfo.chronic.chronicIllnesses
        : [],
      otherChronic: data?.medicalInfo?.chronic?.otherChronic ?? "",
      cancerChronic: data?.medicalInfo?.chronic?.cancerChronic ?? "",
    },
    vaccines: {
      takenVaccines: Array.isArray(data?.medicalInfo?.vaccines?.takenVaccines)
        ? data.medicalInfo.vaccines.takenVaccines
        : [],
      otherVaccine: data?.medicalInfo?.vaccines?.otherVaccine ?? "",
    },
    surgeries: Array.isArray(data?.medicalInfo?.surgeries)
      ? data.medicalInfo.surgeries.map((item) => ({
          ...item,
          surgeonName:
            item?.surgeonName ?? item?.reason ?? item?.description ?? "",
          surgeryDate: item?.surgeryDate ?? "",
          hospital: item?.hospital ?? "",
          complications: item?.complications ?? "",
        }))
      : [],
  },
  lifestyleAndAllergies: {
    smokingStatus: data?.lifestyleAndAllergies?.smokingStatus ?? "",
    smokingFrequency: data?.lifestyleAndAllergies?.smokingFrequency ?? "",
    alcoholStatus: data?.lifestyleAndAllergies?.alcoholStatus ?? "",
    alcoholFrequency: data?.lifestyleAndAllergies?.alcoholFrequency ?? "",
    drugUseStatus: data?.lifestyleAndAllergies?.drugUseStatus ?? "",
    drugUseFrequency: data?.lifestyleAndAllergies?.drugUseFrequency ?? "",
    stressLevel: data?.lifestyleAndAllergies?.stressLevel ?? "",
    foodAllergies: data?.lifestyleAndAllergies?.foodAllergies ?? "",
    drugAllergies: data?.lifestyleAndAllergies?.drugAllergies ?? "",
  },
  parentMedicalInfo: {
    chronicIllnesses: Array.isArray(data?.parentMedicalInfo?.chronicIllnesses)
      ? data.parentMedicalInfo.chronicIllnesses
      : [],
    otherChronic: data?.parentMedicalInfo?.otherChronic ?? "",
  },
});

function getStoredSelectedPatient(patientId) {
  const storedPatientId = localStorage.getItem("selectedPatientId");
  const storedPatientRaw = localStorage.getItem("selectedPatient");

  if (!storedPatientRaw || String(storedPatientId) !== String(patientId)) {
    return null;
  }

  try {
    const storedPatient = JSON.parse(storedPatientRaw);
    return String(storedPatient?.id) === String(patientId) ? storedPatient : null;
  } catch (error) {
    console.error("Failed to parse stored patient", error);
    return null;
  }
}

function normalizePatientProfile(profile = {}) {
  const primaryContact = profile?.primaryContact || {};
  const secondaryContact = profile?.secondaryContact || {};

  return {
    ...DEFAULT_PATIENT_PROFILE,
    ...profile,
    primaryContact: {
      ...DEFAULT_PATIENT_PROFILE.primaryContact,
      ...primaryContact,
      phoneNumber: primaryContact.phoneNumber ?? primaryContact.phone ?? "",
    },
    secondaryContact: {
      ...DEFAULT_PATIENT_PROFILE.secondaryContact,
      ...secondaryContact,
      phoneNumber: secondaryContact.phoneNumber ?? secondaryContact.phone ?? "",
    },
  };
}

async function loadPatientProfile(patientId) {
  try {
    const response = await getPatientProfileByIdApi(patientId);
    return normalizePatientProfile(response.data);
  } catch (profileError) {
    console.error("Failed to load patient profile by id", profileError);

    try {
      const patientListResponse = await getAllPatients();
      const matchedPatient = patientListResponse.data?.find(
        (item) => String(item.id) === String(patientId)
      );

      if (matchedPatient) {
        return normalizePatientProfile(matchedPatient);
      }
    } catch (fallbackError) {
      console.error("Failed to load fallback patient list", fallbackError);
    }

    const storedPatient = getStoredSelectedPatient(patientId);
    if (storedPatient) {
      return normalizePatientProfile(storedPatient);
    }

    throw profileError;
  }
}

export default function PatientFormDoctorView() {
  const { patientId } = useParams();
  const [active, setActive] = useState("Basic Info");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [patientProfile, setPatientProfile] = useState(DEFAULT_PATIENT_PROFILE);
  const [medicalInfoState, setMedicalInfoState] = useState(
    DEFAULT_MEDICAL_INFO_STATE
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!patientId) {
      setLoadError("Patient id is missing.");
      setIsLoading(false);
      return;
    }

    const storedPatient = getStoredSelectedPatient(patientId);
    if (storedPatient) {
      setPatientProfile(normalizePatientProfile(storedPatient));
    }

    let isCancelled = false;

    const loadDoctorViewData = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const [profile, medicalInfoResponse] = await Promise.all([
          loadPatientProfile(patientId),
          getPatientMedicalInfoApi(patientId).catch((error) => {
            console.error("Failed to load patient medical info", error);
            return { data: DEFAULT_MEDICAL_INFO_STATE };
          }),
        ]);

        if (isCancelled) return;

        setPatientProfile(profile);
        setMedicalInfoState(
          normalizeMedicalInfoResponse(medicalInfoResponse.data || {})
        );
      } catch (error) {
        console.error("Failed to load doctor patient form view", error);
        if (isCancelled) return;

        setLoadError("Failed to load patient details.");
        toast.error("Failed to load patient details.");
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDoctorViewData();

    return () => {
      isCancelled = true;
    };
  }, [patientId]);

  const renderSection = () => {
    switch (active) {
      case "Basic Info":
        return <BasicInfoForm initialData={patientProfile} readOnly />;
      case "Medical Info":
        return (
          <MedicalHistoryForm
            initialData={medicalInfoState.medicalInfo}
            readOnly
          />
        );
      case "Life Style and Allergies":
        return (
          <HabitsAndAllergiesForm
            initialData={medicalInfoState.lifestyleAndAllergies}
            readOnly
          />
        );
      case "Parent Info":
        return (
          <ParentMedicalForm
            initialData={medicalInfoState.parentMedicalInfo}
            readOnly
          />
        );
      case "Emergency Contact":
        return <EmergencyContactForm initialData={patientProfile} readOnly />;
      default:
        return <BasicInfoForm initialData={patientProfile} readOnly />;
    }
  };

  const buttoncss = "p-2 text-start font-semibold px-3 py-4 w-full";

  const handleSelect = (section) => {
    setActive(section);
    setIsMobileSidebarOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="px-3 md:text-md lg:text-lg font-bold mb-2">
        Sections
      </div>
      <div className="flex flex-col text-sm lg:text-md">
        <button
          className={`${buttoncss} ${
            active === "Basic Info"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Basic Info")}
        >
          <div className="flex flex-row items-center gap-2">
            <BiSolidUserDetail className="text-2xl" /> Basic Info
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Medical Info"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Medical Info")}
        >
          <div className="flex flex-row items-center gap-2">
            <FaHouseChimneyMedical className="text-2xl" /> Medical Info
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Life Style and Allergies"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Life Style and Allergies")}
        >
          <div className="flex flex-row items-center gap-2">
            <GiLifeBar className="text-2xl" /> Life Style and Allergies
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Parent Info"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Parent Info")}
        >
          <div className="flex flex-row items-center gap-2">
            <MdDataset className="text-2xl" /> Parent Info
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Emergency Contact"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Emergency Contact")}
        >
          <div className="flex flex-row items-center gap-2">
            <PiPhoneCallFill className="text-2xl" /> Emergency Contact
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      {!isMobileSidebarOpen && (
        <button
          className="md:hidden fixed left-0 top-1/3 -translate-y-1/2 z-30 bg-secondary text-white rounded-r-full py-2 px-3 shadow-lg"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <MdPlaylistPlay className="text-3xl font-bold" />
        </button>
      )}

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-64 bg-secondary/40 border border-secondary shadow-md flex flex-col gap-4 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 mb-1">
              <span className="font-bold text-mainblack">Sections</span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-mainblack"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="flex flex-row py-4">
        <div className="hidden md:flex md:w-1/3 lg:w-1/4 h-screen flex-col gap-5 rounded-md py-5 mx-2 border border-secondary bg-secondary/40 shadow-md">
          {sidebarContent}
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4 mx-2 border2 border-gray-300 bg-white shadow-md p-4">
          <div className="mb-4 rounded-xl border border-secondary/20 bg-secondary/5 px-4 py-3">
            <p className="text-sm font-semibold text-secondary">
              Doctor view only
            </p>
            <p className="text-sm text-gray-600">
              Patient details are loaded from the database and cannot be edited
              from this page.
            </p>
          </div>

          {isLoading ? (
            <p className="text-sm text-gray-500">Loading patient details...</p>
          ) : loadError ? (
            <p className="text-sm text-red-500">{loadError}</p>
          ) : (
            renderSection()
          )}
        </div>
      </div>
    </>
  );
}
