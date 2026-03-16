import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { GiLifeBar } from "react-icons/gi";
import { MdDataset } from "react-icons/md";

import MedicalHistoryForm from "./FormComponent/MedicalHistoryForm";
import HabitsAndAllergiesForm from "./FormComponent/HabitsAndAllergiesForm";
import ParentMedicalForm from "./FormComponent/ParentMediInfo";
import {
  getPatientMedicalInfoApi,
  getPatientProfileApi,
  updatePatientMedicalInfoApi,
} from "../../api/PatientApi";

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

export default function PatientMediInfomation() {
  const [active, setActive] = useState("Medical Info");
  const [patientId, setPatientId] = useState(null);
  const [medicalInfoState, setMedicalInfoState] = useState(
    DEFAULT_MEDICAL_INFO_STATE
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    {
      key: "Medical Info",
      label: "Medical Info",
      icon: <FaHouseChimneyMedical />,
    },
    {
      key: "Life Style and Allergies",
      label: "Life Style & Allergies",
      icon: <GiLifeBar />,
    },
    {
      key: "Parent Info",
      label: "Parent Medical Info",
      icon: <MdDataset />,
    },
  ];

  useEffect(() => {
    const loadMedicalInfo = async () => {
      try {
        setIsLoading(true);
        const profileRes = await getPatientProfileApi();
        const resolvedPatientId = profileRes.data?.id;

        if (!resolvedPatientId) {
          throw new Error("Patient id was not returned from profile API");
        }

        setPatientId(resolvedPatientId);

        const medicalInfoRes = await getPatientMedicalInfoApi(resolvedPatientId);
        setMedicalInfoState(
          normalizeMedicalInfoResponse(medicalInfoRes.data || {})
        );
      } catch (error) {
        console.error("Failed to load patient medical info", error);
        toast.error("Failed to load patient medical information.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicalInfo();
  }, []);

  const saveMedicalInfoState = async (nextState) => {
    if (!patientId) {
      throw new Error("Patient id is not available");
    }

    setIsSaving(true);

    try {
      const response = await updatePatientMedicalInfoApi(patientId, nextState);
      const normalized = normalizeMedicalInfoResponse(response.data || {});
      setMedicalInfoState(normalized);
      return normalized;
    } catch (error) {
      console.error("Failed to save patient medical info", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleMedicalInfoSubmit = async (medicalInfo) => {
    await saveMedicalInfoState({
      ...medicalInfoState,
      medicalInfo,
    });
  };

  const handleLifestyleSubmit = async (lifestyleAndAllergies) => {
    await saveMedicalInfoState({
      ...medicalInfoState,
      lifestyleAndAllergies,
    });
  };

  const handleParentInfoSubmit = async (parentMedicalInfo) => {
    await saveMedicalInfoState({
      ...medicalInfoState,
      parentMedicalInfo,
    });
  };

  const renderSection = () => {
    switch (active) {
      case "Medical Info":
        return (
          <MedicalHistoryForm
            initialData={medicalInfoState.medicalInfo}
            onSubmit={handleMedicalInfoSubmit}
            isSaving={isSaving}
          />
        );
      case "Life Style and Allergies":
        return (
          <HabitsAndAllergiesForm
            initialData={medicalInfoState.lifestyleAndAllergies}
            onSubmit={handleLifestyleSubmit}
            isSaving={isSaving}
          />
        );
      case "Parent Info":
        return (
          <ParentMedicalForm
            initialData={medicalInfoState.parentMedicalInfo}
            onSubmit={handleParentInfoSubmit}
            isSaving={isSaving}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-md p-6">
        <p className="text-sm text-gray-500">Loading medical information...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-wrap gap-2 border-b pb-3 mb-6">
        {tabs.map((tab) => {
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-secondary text-white shadow"
                    : "text-gray-600 hover:bg-secondary/10"
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[300px]">{renderSection()}</div>
    </div>
  );
}
