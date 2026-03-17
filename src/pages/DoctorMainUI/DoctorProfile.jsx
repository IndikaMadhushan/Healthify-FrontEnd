// import React from "react";
// import ProfileImageCropper from "../../components/profileImageCropper";
// import { getDoctorProfileApi } from "../../api/DoctorApi";
// import { useEffect, useState } from "react";
// import DoctorProfileEditModal from "./DoctorProfileEditModal";

// const DoctorProfile = () => {

//   const [doctor, setDoctor] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);

//   useEffect(() => {
//     const loadDoctor = async () => {
//       try {
//         const res = await getDoctorProfileApi();
//         setDoctor(res.data);
//       } catch (err) {
//         console.error("Failed to load doctor profile", err);
//       }
//     };

//     loadDoctor();
//   }, []);

//   const showValue = (value) => {
//     return value === null || value === undefined || value === "" ? "-" : value;
//   };

//   if (!doctor) return null;

//   return (
//     <div className="w-full">

//       {/* Cover Section */}
//       <div className="w-screen h-32 bg-gradient-to-r from-secondary to-primary relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">

//         <div className="absolute -bottom-16 left-12">
//           <div className="bg-white p-2 rounded-full shadow-xl">
//             <ProfileImageCropper />
//           </div>
//         </div>

//       </div>

//       {/* Profile Section */}
//       <div className="max-w-6xl mx-auto mt-24 px-6">

//         {/* Name + Button */}
//         <div className="flex justify-between items-center flex-wrap gap-4">

//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Dr. {showValue(doctor.fullName)}
//             </h1>

//             <p className="text-secondary font-medium mt-1">
//               {showValue(doctor.specialization)}
//             </p>

//             <p className="text-gray-500 text-sm">
//               {showValue(doctor.hospital)}
//             </p>

//           </div>

//           <button
//             onClick={() => setEditOpen(true)}
//             className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
//             >
//             Edit Profile
//             </button>

//         </div>

//             {/* EDIT FORM */}
//             {editOpen && (
//   <DoctorProfileEditModal
//     doctor={doctor}
//     onClose={() => setEditOpen(false)}
//     onUpdated={(updatedDoctor) => {
//       setDoctor(updatedDoctor);
//     }}
//   />
// )}

//         {/* Info Cards */}
//         <div className="grid md:grid-cols-3 gap-6 mt-10">

//           {/* Personal */}
//           <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//             <h2 className="text-lg font-semibold text-secondary mb-4">
//               Personal Information
//             </h2>

//             <div className="space-y-3">

//               <div>
//                 <p className="text-sm text-gray-500">Gender</p>
//                 <p className="font-medium">{showValue(doctor.gender)}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Date of Birth</p>
//                 <p className="font-medium">{showValue(doctor.dateOfBirth)}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Age</p>
//                 <p className="font-medium">{showValue(doctor.age)}</p>
//               </div>

//               {/* <div>
//                 <p className="text-sm text-gray-500">NIC</p>
//                 <p className="font-medium">{showValue(doctor.nic)}</p>
//               </div> */}

//             </div>
//           </div>

//           {/* Contact */}
//           <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//             <h2 className="text-lg font-semibold text-secondary mb-4">
//               Contact Information
//             </h2>

//             <div className="space-y-3">

//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-medium">{showValue(doctor.email)}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Hospital / Clinic</p>
//                 <p className="font-medium">{showValue(doctor.hospital)}</p>
//               </div>

//             </div>
//           </div>

//           {/* Professional */}
//           <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//             <h2 className="text-lg font-semibold text-secondary mb-4">
//               Professional Details
//             </h2>

//             <div className="space-y-3">

//               <div>
//                 <p className="text-sm text-gray-500">Specialization</p>
//                 <p className="font-medium">{showValue(doctor.specialization)}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">SLMC Number</p>
//                 <p className="font-medium">{showValue(doctor.licenseNumber)}</p>
//               </div>

//             </div>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default DoctorProfile;

