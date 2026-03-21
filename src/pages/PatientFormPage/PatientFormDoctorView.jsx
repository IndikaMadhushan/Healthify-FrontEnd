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

  const sections = [
    {
      key: "Basic Info",
      label: "Basic Info",
      description: "Identity, demographics, and communication details.",
      icon: BiSolidUserDetail,
    },
    {
      key: "Medical Info",
      label: "Medical Info",
      description: "Clinical history, vaccines, and surgery records.",
      icon: FaHouseChimneyMedical,
    },
    {
      key: "Life Style and Allergies",
      label: "Life Style and Allergies",
      description: "Habits, stress factors, and documented allergies.",
      icon: GiLifeBar,
    },
    {
      key: "Parent Info",
      label: "Parent Info",
      description: "Family and parent-side medical background.",
      icon: MdDataset,
    },
    {
      key: "Emergency Contact",
      label: "Emergency Contact",
      description: "Primary and secondary emergency contact details.",
      icon: PiPhoneCallFill,
    },
  ];

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

  const handleSelect = (section) => {
    setActive(section);
    setIsMobileSidebarOpen(false);
  };

  const activeSection =
    sections.find((section) => section.key === active) ?? sections[0];
  const ActiveSectionIcon = activeSection.icon;
  const patientDisplayName =
    patientProfile.fullName ||
    [patientProfile.firstName, patientProfile.secondName, patientProfile.lastName]
      .filter(Boolean)
      .join(" ") ||
    `Patient #${patientId}`;
  const patientInitial = patientDisplayName.charAt(0).toUpperCase() || "P";
  const patientPhotoUrl =
    patientProfile.photoUrl || patientProfile.profilePic || null;
  const patientSummary = [
    {
      label: "Patient ID",
      value: patientProfile.patientId || patientId || "Not added",
    },
    {
      label: "Gender",
      value: patientProfile.gender || "Not added",
    },
    {
      label: "District",
      value: patientProfile.district || "Not added",
    },
    {
      label: "Contact",
      value: patientProfile.phone || patientProfile.email || "Not added",
    },
  ];

  const sidebarContent = (
    <>
      <div className="border-b border-[#D9ECEA] px-5 pb-4">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          Sections
        </p> */}
        <h2 className="mt-2 text-xl font-bold text-[#0F4F52]">
          Patient Medical File
        </h2>
        {/* <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
          The doctor can switch between sections while the patient details stay
          read-only.
        </p> */}
      </div>
      <div className="space-y-2 px-3 py-4">
        {sections.map((section, index) => {
          const SectionIcon = section.icon;
          const isActive = active === section.key;

          return (
            <button
              key={section.key}
              type="button"
              className={`w-full rounded-[22px] border px-4 py-4 text-left transition-all ${
                isActive
                  ? "border-transparent bg-gradient-to-r from-secondary to-primary text-white shadow-[0_18px_38px_rgba(24,170,176,0.26)]"
                  : "border-[#DCEFED] bg-white text-[#0F4F52] hover:border-secondary/40 hover:bg-[#F4FBFA]"
              }`}
              onClick={() => handleSelect(section.key)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  <SectionIcon className="text-xl" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {section.label}
                    </span>
                    <span
                      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[11px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#EAF7F5] text-secondary"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-xs leading-5 ${
                      isActive ? "text-white/80" : "text-[#6B8A8C]"
                    }`}
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {/* <div className="border-t border-[#D9ECEA] px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8A8C]">
          Selected patient
        </p>
        <p className="mt-2 text-sm font-semibold text-[#0F4F52]">
          {patientDisplayName}
        </p>
        <p className="mt-1 text-xs text-[#6B8A8C]">
          Record ID: {patientProfile.patientId || patientId || "Unavailable"}
        </p>
      </div> */}
    </>
  );

  return (
    <>
      {!isMobileSidebarOpen && (
        <button
          type="button"
          className="md:hidden fixed left-3 top-1/3 z-30 rounded-full bg-gradient-to-r from-secondary to-primary p-3 text-white shadow-[0_18px_36px_rgba(24,170,176,0.28)]"
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
            className="absolute left-0 top-0 h-full w-[84%] max-w-[320px] overflow-y-auto border-r border-[#D9ECEA] bg-white/95 py-5 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between px-5">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Navigator
              </span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="rounded-full bg-[#F2FBFA] p-2 text-[#0F4F52]"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="relative px-3 py-4 sm:px-4 lg:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(24,170,176,0.18),_transparent_50%),radial-gradient(circle_at_top_right,_rgba(15,79,82,0.12),_transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4F52] via-secondary to-primary px-6 py-7 text-white shadow-[0_28px_70px_rgba(24,170,176,0.24)] sm:px-8 lg:px-10">
            <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-4">
                {patientPhotoUrl ? (
                  <img
                    src={patientPhotoUrl}
                    alt={patientDisplayName}
                    className="h-20 w-20 rounded-[28px] border-4 border-white/20 object-cover shadow-[0_14px_36px_rgba(15,79,82,0.24)]"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/15 text-3xl font-bold text-white shadow-[0_14px_36px_rgba(15,79,82,0.24)]">
                    {patientInitial}
                  </div>
                )}

                <div>
                  {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                    Doctor View
                  </p> */}
                  <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    {patientDisplayName}
                  </h1>
                  {/* <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                    Review the patient&apos;s medical file section by section in
                    a read-only clinical view.
                  </p> */}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
                {patientSummary.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
            <aside className="hidden md:block md:w-[300px] md:shrink-0 md:self-start md:sticky md:top-24">
              <div className="overflow-hidden rounded-[30px] border border-[#DCEFED] bg-white/92 shadow-[0_24px_60px_rgba(15,79,82,0.12)] backdrop-blur-sm">
                {sidebarContent}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="overflow-hidden rounded-[32px] border border-[#DCEFED] bg-white/95 shadow-[0_24px_60px_rgba(15,79,82,0.12)] backdrop-blur-sm">
                <div className="border-b border-[#DCEFED] bg-[linear-gradient(135deg,#F7FCFB_0%,#EFF9F6_100%)] px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                        <ActiveSectionIcon className="text-xl" />
                      </div>
                      <div>
                        {/* <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8A8C]">
                          Current Section
                        </p> */}
                        <h2 className="mt-1 text-2xl font-bold text-[#0F4F52]">
                          {activeSection.label}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
                          {activeSection.description}
                        </p>
                      </div>
                    </div>

                    {/* <div className="inline-flex w-fit items-center rounded-full border border-[#DCEFED] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary shadow-sm">
                      Read Only View
                    </div> */}
                  </div>
                </div>

                <div className="p-5 sm:p-6 lg:p-8">
                  {isLoading ? (
                    <div className="rounded-[28px] border border-dashed border-[#CFE8E5] bg-[linear-gradient(135deg,#F8FCFB_0%,#F1F9F7_100%)] p-8 text-center">
                      <p className="text-base font-semibold text-[#0F4F52]">
                        Loading patient details...
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
                        Preparing the selected section for the doctor view.
                      </p>
                    </div>
                  ) : loadError ? (
                    <div className="rounded-[28px] border border-red-200 bg-red-50 p-6">
                      <p className="text-base font-semibold text-red-600">
                        {loadError}
                      </p>
                      <p className="mt-2 text-sm text-red-500">
                        Please reopen the patient record and try again.
                      </p>
                    </div>
                  ) : (
                    renderSection()
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
