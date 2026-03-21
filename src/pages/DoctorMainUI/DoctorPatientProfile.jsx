import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientProfileByIdApi } from "../../api/PatientApi";
import { getDisplayName, getNameParts } from "../../utils/nameUtils";
import ProfileAvatar from "../../components/ProfileAvatar";
import { FaUser } from "react-icons/fa";

function showValue(value) {
  return value === null || value === undefined || value === ""
    ? "-"
    : value;
}

function parseParentName(parent) {
  if (!parent) {
    return "-";
  }

  const displayName = getDisplayName(parent);
  if (displayName) {
    return displayName;
  }

  return parent.name || "-";
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F7FCFB] border border-[#D3F0ED] p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-[#0F4F52]">{showValue(value)}</p>
    </div>
  );
}

function SectionLabel({ text, className = "" }) {
  return (
    <div
      className={`sm:col-span-2 text-sm font-semibold text-[#18AAB0] ${className}`}
    >
      {text}
    </div>
  );
}

function ProfileSection({ title, children, margin = "" }) {
  return (
    <div className={margin}>
      <h2 className="text-lg font-semibold text-[#0F4F52] mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function WideSection({ children, margin = "" }) {
  return (
    <div className={margin}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function DoctorPatientProfile() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const loadPatient = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPatientProfileByIdApi(patientId);
        if (isCancelled) {
          return;
        }

        setPatient(response.data ?? null);
      } catch (err) {
        console.error("Failed to load doctor patient profile", err);
        if (isCancelled) {
          return;
        }

        setPatient(null);
        setError("Failed to load patient details.");
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    if (!patientId) {
      setPatient(null);
      setLoading(false);
      setError("Patient id is missing.");
      return undefined;
    }

    void loadPatient();

    return () => {
      isCancelled = true;
    };
  }, [patientId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading patient details...</p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
          <h1 className="text-xl font-semibold text-red-700">
            Unable to load patient details
          </h1>
          <p className="text-sm text-red-600 mt-2">
            {error || "Patient details are not available."}
          </p>
        </div>
      </div>
    );
  }

  const patientName = getNameParts(patient || {});
  const patientDisplayName = getDisplayName(patient || {});

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-6 sm:p-10">
        <div className="flex flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="md:text-3xl text-2xl font-semibold text-[#18AAB0]">
              Patient Profile
            </h1>
            <p className="text-gray-500 md:text-sm text-xs mt-1">
              View patient details in read-only mode
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#D3F0ED] rounded-2xl px-8 py-6 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
            <div className="relative flex items-center justify-center">
              <div className="relative lg:w-35 lg:h-35 w-30 h-30 rounded-full border border-[#D3F0ED] overflow-hidden bg-[#F7FCFB]">
                <ProfileAvatar
                  src={patient?.photoUrl}
                  alt={patient?.fullName || patientDisplayName || "Patient"}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                  fallbackClassName="bg-[#F7FCFB]"
                  fallbackIcon={<FaUser className="text-4xl text-[#7AA7A3]" />}
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-[#0F4F52]">
                {showValue(patient?.fullName || patientDisplayName)}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Registration No:{" "}
                <span className="font-medium text-[#0F4F52]">
                  {showValue(patient?.patientId)}
                </span>
              </p>

              <p className="text-sm text-gray-400 mt-1">Patient Profile</p>

              <div className="mt-4 h-px w-40 bg-[#D3F0ED] mx-auto md:mx-0" />

              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
                <span>
                  AGE:{" "}
                  <span className="font-medium text-[#0F4F52]">
                    {showValue(patient?.age)}
                  </span>
                </span>
                <span className="hidden sm:block">•</span>
                <span>
                  Gender:{" "}
                  <span className="font-medium text-[#0F4F52]">
                    {showValue(patient?.gender)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <ProfileSection title="Personal Information" margin="mb-10">
          <Info label="First Name" value={patientName.firstName} />
          <Info label="Second Name" value={patientName.secondName} />
          <Info label="Last Name" value={patientName.lastName} />
          <Info label="Date of Birth" value={patient?.dateOfBirth} />
          <Info label="Age" value={patient?.age} />
          <Info label="Gender" value={patient?.gender} />
          <Info label="Nationality" value={patient?.nationality} />
          <Info label="Marital Status" value={patient?.maritalStatus} />
          <Info label="NIC" value={patient?.nic} />
          <Info label="Occupation" value={patient?.occupation} />
        </ProfileSection>

        <ProfileSection title="Contact Information">
          <Info label="District" value={patient?.district} />
          <Info label="Contact Number" value={patient?.phone} />
        </ProfileSection>

        <WideSection margin="mb-10 mt-4">
          <Info label="Address" value={patient?.address} />
          <Info label="Email Address" value={patient?.email} />
        </WideSection>

        <ProfileSection title="Emergency Contacts" margin="mb-10">
          <SectionLabel text="Primary Emergency Contact" />
          <Info
            label="Contact Person"
            value={patient?.primaryContact?.name}
          />
          <Info
            label="Relationship"
            value={patient?.primaryContact?.relationship}
          />
          <Info
            label="Contact Number"
            value={
              patient?.primaryContact?.phoneNumber ??
              patient?.primaryContact?.phone
            }
          />

          {patient?.secondaryContact?.name && (
            <>
              <SectionLabel text="Secondary Emergency Contact" className="mt-6" />
              <Info
                label="Contact Person"
                value={patient?.secondaryContact?.name}
              />
              <Info
                label="Relationship"
                value={patient?.secondaryContact?.relationship}
              />
              <Info
                label="Contact Number"
                value={
                  patient?.secondaryContact?.phoneNumber ??
                  patient?.secondaryContact?.phone
                }
              />
            </>
          )}
        </ProfileSection>

        <ProfileSection title="Family Information">
          <Info label="Father" value={parseParentName(patient?.father)} />
          <Info label="Mother" value={parseParentName(patient?.mother)} />
        </ProfileSection>
      </div>
    </div>
  );
}
