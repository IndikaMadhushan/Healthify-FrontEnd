// const patient = {
//   fullName: "Parindya Hewage",
//   dob: "2001-10-07",
//   age: 23,
//   gender: "Female",
//   nationality: "Sri Lankan",
//   maritalStatus: "Single",
//   nic: "200123456789",
//   occupation: "Undergraduate",
//   address: "No 45, Galle Road",
//   district: "Galle",
//   contact: "0771234567",
//   email: "parindya@gmail.com",

import ProfileImageCropper from "../../components/profileImageCropper";

//   emergency1: {
//     name: "Bhagya Hewage",
//     relationship: "Sister",
//     contact: "0719876543"
//   },

//   emergency2: {
//     name: "Bhagya Hewage",
//     relationship: "Sister",
//     contact: "0719876543"
//   }
// };

// export default function MyProfile() {
//   return (
//     <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-10">

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#18AAB0]">
//             My Profile
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Personal & emergency details
//           </p>
//         </div>

//         <button className="px-5 py-2 rounded-full bg-[#18AAB0] text-white text-sm hover:opacity-90">
//           Edit Profile
//         </button>
//       </div>

//       {/* PERSONAL INFO */}
//       <Section title="Personal Information">
//         <Info label="Full Name" value={patient.fullName} />
//         <Info label="Date of Birth" value={patient.dob} />
//         <Info label="Age" value={patient.age} />
//         <Info label="Gender" value={patient.gender} />
//         <Info label="Nationality" value={patient.nationality} />
//         <Info label="Marital Status" value={patient.maritalStatus} />
//         <Info label="NIC" value={patient.nic} />
//         <Info label="Occupation" value={patient.occupation} />
//       </Section>

//       {/* CONTACT INFO */}
//       <Section title="Contact Information">
//         <Info label="Address" value={patient.address} />
//         <Info label="District" value={patient.district} />
//         <Info label="Contact Number" value={patient.contact} />
//         <Info label="Email" value={patient.email} />
//       </Section>

//       {/* EMERGENCY */}
//       {/* EMERGENCY */}
//         <Section title="Emergency Contact">

//           {/* Required Emergency Contact */}
//           <Info label="Contact Person" value={patient.emergency1.name} />
//           <Info label="Relationship" value={patient.emergency1.relationship} />
//           <Info label="Contact Number" value={patient.emergency1.contact} />

//           {/* Optional Emergency Contact */}
//           {patient.emergency2?.name && (
//             <>
//               <div className="sm:col-span-2 mt-4 text-sm font-semibold text-[#0F4F52]">
//                 Additional Emergency Contact
//               </div>

//               <Info label="Contact Person" value={patient.emergency2.name} />
//               <Info label="Relationship" value={patient.emergency2.relationship} />
//               <Info label="Contact Number" value={patient.emergency2.contact} />
//             </>
//           )}

//         </Section>
      

//     </div>
//   );
// }

// /* --------- REUSABLE COMPONENTS --------- */

// function Section({ title, children }) {
//   return (
//     <div className="mb-8">
//       <h2 className="text-lg font-semibold text-[#0F4F52] mb-4">
//         {title}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {children}
//       </div>
//     </div>
//   );
// }

// function Info({ label, value }) {
//   return (
//     <div className="bg-[#F2FBFA] rounded-xl p-4">
//       <p className="text-xs text-gray-500 mb-1">{label}</p>
//       <p className="text-sm font-medium text-[#0F4F52]">
//         {value || "-"}
//       </p>
//     </div>
//   );
// }

const patient = {
  fullName: "Parindya Hewage",
  dob: "2001-10-07",
  age: 23,
  gender: "Female",
  nationality: "Sri Lankan",
  maritalStatus: "Single",
  nic: "200123456789",
  occupation: "Undergraduate",
  address: "No 45, Galle Road weligama",
  district: "Galle",
  contact: "0771234567",
  email: "parindya@gmail.com",
  regNumber: "PAT-2026-0001",

  emergency1: {
    name: "Bhagya Hewage",
    relationship: "Sister",
    contact: "0719876543"
  },

  emergency2: {
    name: "Bhagya Hewage",
    relationship: "Sister",
    contact: "0719876543"
  }
};

export default function MyProfile() {
  return (
    <div className="min-h-screen  px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-6 sm:p-10">

        {/* HEADER */}
        <div className="flex flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="md:text-3xl text-2xl font-semibold text-[#18AAB0]">
              Patient Profile
            </h1>
            <p className="text-gray-500 md:text-sm text-xs mt-1">
              View and manage personal health information
            </p>
          </div>

          <button className="self-start sm:self-auto px-6 py-2.5 rounded-full bg-[#18AAB0] text-white xs:text-sm text-xs font-medium hover:opacity-90 transition">
            Edit Profile
          </button>
        </div>
        
       

        {/* ===== PROFILE HEADER SECTION ===== */}
        <div className="bg-white border border-[#D3F0ED] rounded-2xl px-8 py-6 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">

           
            <div className="relative flex items-center justify-center">

             
              <div className="relative z-10">
                <ProfileImageCropper />
              </div>
             </div>

            {/* ===== PATIENT DETAILS ===== */}
            <div className="flex-1 text-center md:text-left">

              
              <h2 className="text-2xl font-semibold text-[#0F4F52] leading-tight">
                {patient.fullName}
              </h2>

             
              <p className="text-sm text-gray-500 mt-1">
                Registration No:{" "}
                <span className="font-medium text-[#0F4F52]">
                  {patient.regNumber}
                </span>
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Patient Profile
              </p>

             
              <div className="mt-4 h-px w-40 bg-[#D3F0ED] mx-auto md:mx-0" />

             
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
                <span>
                  📅AGE: <span className="font-medium text-[#0F4F52]">{patient.age}</span>
                </span>
                <span className="hidden sm:block">•</span>
                <span>
                  🧬 Gender: <span className="font-medium text-[#0F4F52]">{patient.gender}</span>
                </span>
              </div>

            </div>

           
            

          </div>
        </div>


        {/* PERSONAL INFORMATION */}
        <ProfileSection1 title="Personal Information" margin="mb-10">
          <Info label="Full Name" value={patient.fullName} />
          <Info label="Date of Birth" value={patient.dob} />
          <Info label="Age" value={patient.age} />
          <Info label="Gender" value={patient.gender} />
          <Info label="Nationality" value={patient.nationality} />
          <Info label="Marital Status" value={patient.maritalStatus} />
          <Info label="NIC" value={patient.nic} />
          <Info label="Occupation" value={patient.occupation} />
        </ProfileSection1>

        {/* CONTACT INFORMATION */}
        <ProfileSection1 title="Contact Information" >
          <Info label="District" value={patient.district} />
          <Info label="Contact Number" value={patient.contact} />
        </ProfileSection1>
        <ProfileSection2 margin="mb-10 mt-4" >
          <Info label="Address" value={patient.address} />
          <Info label="Email Address" value={patient.email} />
        </ProfileSection2>
        

        {/* EMERGENCY CONTACTS */}
        <ProfileSection1 title="Emergency Contacts" margin="mb-10">

          {/* PRIMARY */}
          <SectionLabel text="Primary Emergency Contact" />

          <Info label="Contact Person" value={patient.emergency1.name} />
          <Info label="Relationship" value={patient.emergency1.relationship} />
          <Info label="Contact Number" value={patient.emergency1.contact} />

          {/* SECONDARY (OPTIONAL) */}
          {patient.emergency2?.name && (
            <>
              <SectionLabel text="Secondary Emergency Contact" className="mt-6" />

              <Info label="Contact Person" value={patient.emergency2.name} />
              <Info label="Relationship" value={patient.emergency2.relationship} />
              <Info label="Contact Number" value={patient.emergency2.contact} />
            </>
          )}
        </ProfileSection1>

      </div>
    </div>
  );
}

/* ================== UI COMPONENTS ================== */

function ProfileSection1({ title, children, margin }) {
  return (
    <div className={margin}>
      <h2 className="text-lg font-semibold text-[#0F4F52] mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function ProfileSection2({  children, margin  }) {
  return (
    
    <div className={margin}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F7FCFB] border border-[#D3F0ED] p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-[#0F4F52]">
        {value || "-"}
      </p>
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