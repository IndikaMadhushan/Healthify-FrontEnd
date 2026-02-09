// // import { useState } from "react";
// // import ClinicBookCard from "./ClinicBookCard";
// // import EditClinicBookModal from "./EditClinicBookModal";
// // import { clinicBooks as initialBooks } from "./clinicBooks";

// // export default function MyClinicBooks() {
// //   const [books, setBooks] = useState(initialBooks);
// //   const [editingBook, setEditingBook] = useState(null);

// //   const handleSave = (updatedBook) => {
// //     setBooks((prev) =>
// //       prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
// //     );
// //   };

// //   const handleDelete = (id) => {
// //     setBooks((prev) => prev.filter((b) => b.id !== id));
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-6">My Clinic Books</h1>

// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {books.map((book) => (
// //           <ClinicBookCard
// //             key={book.id}
// //             book={book}
// //             onEdit={setEditingBook}
// //           />
// //         ))}
// //       </div>

// //       {editingBook && (
// //         <EditClinicBookModal
// //           book={editingBook}
// //           onClose={() => setEditingBook(null)}
// //           onSave={handleSave}
// //           onDelete={handleDelete}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import { clinicBooks as data } from "./clinicBooks";
// // import ClinicBookCard from "./ClinicBookCard";
// // import EditClinicBookModal from "./EditClinicBookModal";
// // import CreateClinicBookCard from "./CreateClinicBookCard";

// // export default function MyClinicBooks() {
// //   const [clinicBooks, setClinicBooks] = useState(data);
// //   const [editingBook, setEditingBook] = useState(null);
// //   const [mode, setMode] = useState("edit"); // ✅ NEW

// //   const saveBook = (book) => {
// //     if (mode === "create") {
// //       setClinicBooks((prev) => [
// //         {
// //           ...book,
// //           id: `CB${Date.now()}`,
// //           doctorName: "Doctor Name",
// //           doctorNo: "SLMC-XXXX",
// //           specialization: "General Physician",
// //           medicationPurpose: book.reason,
// //           lastUpdatedBy: "Doctor",
// //         },
// //         ...prev,
// //       ]);
// //     } 
    
// //     else {
// //       setClinicBooks((prev) =>
// //         prev.map((b) => (b.id === book.id ? book : b))
// //       );
// //     }

// //     setEditingBook(null);
// //     setMode("edit");
// //   };

// //   const deleteBook = (id) => {
// //     setClinicBooks((prev) => prev.filter((b) => b.id !== id));
// //     setEditingBook(null);
// //   };

// //   const openCreate = () => {
// //     setMode("create");
// //     setEditingBook({});
// //   };

// //   return (
// //     <>
// //     <div className="max-w-6xl mx-auto p-6">
// //       {/* <h1 className="text-2xl font-bold mb-6 ">My Clinic Books</h1> */}

// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {clinicBooks.map((book) => (
// //           <ClinicBookCard
// //             key={book.id}
// //             book={book}
// //             onEdit={(b) => {
// //               setMode("edit");
// //               setEditingBook(b);
// //             }}
// //           />
// //         ))}

// //         {/* ➕ CREATE CARD (DOCTOR ONLY UI) */}
// //         <CreateClinicBookCard onCreate={openCreate} />
// //       </div>

// //       {editingBook && (
// //         <EditClinicBookModal
// //           book={editingBook}
// //           mode={mode}
// //           onClose={() => setEditingBook(null)}
// //           onSave={saveBook}
// //           onDelete={deleteBook}
// //         />
// //       )}
// //     </div>
// //     </>
// //   );
// // }



// // import { useState } from "react";
// // import { clinicBooks as initialData } from "./clinicBooks";
// // import ClinicBookCard from "./ClinicBookCard";
// // import ClinicBookFlip from "./ClinicBookFlip";
// // import EditClinicBookModal from "./EditClinicBookModal";
// // import CreateClinicBookCard from "./CreateClinicBookCard";

// // export default function MyClinicBooks() {
// //   const [clinicBooks, setClinicBooks] = useState(initialData);
// //   const [editingBook, setEditingBook] = useState(null);
// //   const [openBook, setOpenBook] = useState(null);
// //   const [mode, setMode] = useState("edit");

// //   return (
// //     <>
// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {clinicBooks.map((book) => (
// //           <ClinicBookCard
// //             key={book.id}
// //             book={book}
// //             onEdit={(b) => {
// //               setMode("edit");
// //               setEditingBook(b);
// //             }}
// //             onView={(b) => setOpenBook(b)}
// //           />
// //         ))}

// //         <CreateClinicBookCard
// //           onCreate={() => {
// //             setMode("create");
// //             setEditingBook({});
// //           }}
// //         />
// //       </div>

// //       {editingBook && (
// //         <EditClinicBookModal
// //           book={editingBook}
// //           mode={mode}
// //           onClose={() => setEditingBook(null)}
// //           onSave={(b) => {
// //             setClinicBooks((prev) =>
// //               mode === "create"
// //                 ? [b, ...prev]
// //                 : prev.map((x) => (x.id === b.id ? b : x))
// //             );
// //             setEditingBook(null);
// //           }}
// //         />
// //       )}

// //       {openBook && (
// //         <ClinicBookFlip
// //           book={openBook}
// //           onClose={() => setOpenBook(null)}
// //         />
// //       )}
// //     </>
// //   );
// // }

// //first backend
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import ClinicBookCard from "./ClinicBookCard";
// // import ClinicBookFlip from "./ClinicBookFlip";
// // import EditClinicBookModal from "./EditClinicBookModal";
// // import CreateClinicBookCard from "./CreateClinicBookCard";

// // export default function MyClinicBooks() {
// //   const [clinicBooks, setClinicBooks] = useState([]);
// //   const [editingBook, setEditingBook] = useState(null);
// //   const [openBook, setOpenBook] = useState(null);
// //   const [mode, setMode] = useState("edit");

// //   // 🔹 FETCH FROM BACKEND
// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:8080/api/v1/cbook/patient/15")
// //       .then((res) => setClinicBooks(res.data))
// //       .catch((err) => console.error(err));
// //   }, []);

// //   return (
// //     <>
// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {clinicBooks.map((book) => (
// //           <ClinicBookCard
// //             key={book.id}
// //             book={book}
// //             onEdit={(b) => {
// //               setMode("edit");
// //               setEditingBook(b);
// //             }}
// //             onView={(b) => setOpenBook(b)}
// //           />
// //         ))}

// //         <CreateClinicBookCard
// //           onCreate={() => {
// //             setMode("create");
// //             setEditingBook({});
// //           }}
// //         />
// //       </div>

// //       {editingBook && (
// //         <EditClinicBookModal
// //           book={editingBook}
// //           mode={mode}
// //           onClose={() => setEditingBook(null)}
// //           onSave={(savedBook) => {
// //             if (mode === "create") {
// //               setClinicBooks((prev) => [savedBook, ...prev]);
// //             } else {
// //               setClinicBooks((prev) =>
// //                 prev.map((b) => (b.id === savedBook.id ? savedBook : b))
// //               );
// //             }
// //             setEditingBook(null);
// //           }}
// //         />
// //       )}

// //       {openBook && (
// //         <ClinicBookFlip
// //           book={openBook}
// //           onClose={() => setOpenBook(null)}
// //         />
// //       )}
// //     </>
// //   );
// // }



// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import ClinicBookCard from "./ClinicBookCard";
// // import CreateClinicBookCard from "./CreateClinicBookCard";

// // export default function MyClinicBooks() {
// //   const [clinicBooks, setClinicBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:8080/api/v1/cbook/patient/15")
// //       .then((res) => {
// //         setClinicBooks(res.data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("API ERROR", err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return <p className="text-slate-300">Loading clinic books...</p>;
// //   }

// //   return (
// //     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {clinicBooks.map((book) => (
// //         <ClinicBookCard key={book.id} book={book} />
// //       ))}

// //       <CreateClinicBookCard onCreate={() => {}} />
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import {getClinicBooksByPatientId,getMyClinicBooks,} from "../../../api/ClinicBookApi";
// import { useParams } from "react-router-dom";
// import ClinicBookCard from "./ClinicBookCard";
// import ClinicBookFlip from "./ClinicBookFlip";
// import EditClinicBookModal from "./EditClinicBookModal";
// import CreateClinicBookCard from "./CreateClinicBookCard";

// export default function MyClinicBooks() {
//   const { patientId } = useParams(); // 👈 doctor route provides this
//   const [clinicBooks, setClinicBooks] = useState([]);
//   const [editingBook, setEditingBook] = useState(null);
//   const [openBook, setOpenBook] = useState(null);
//   const [mode, setMode] = useState("edit");

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");

//   //   // DECIDE API BASED ON LOGIN TYPE
//   //   const url = patientId
//   //     ? `http://localhost:8080/api/v1/cbook/patient/${patientId}` // DOCTOR
//   //     : `http://localhost:8080/api/v1/cbook/patient-clinic`;      // PATIENT

//   //   axios
//   //     .get(url, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     })
//   //     .then((res) => {
//   //       const mappedBooks = res.data.map((item, index) => ({
//   //         id: index + 1, // temporary
//   //         doctorName: item.doctorFullName,
//   //         doctorNo: item.licenseNumber,
//   //         specialization: item.specialization,
//   //         medicationPurpose: item.visitReason,
//   //         access: item.accessControl,
//   //         lastUpdatedBy: item.updatedDoctor,
//   //         lastUpdated:
//   //           item.updatedTime === "Not updated yet"
//   //             ? new Date()
//   //             : item.updatedTime,
//   //       }));

//   //       setClinicBooks(mappedBooks);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Failed to load clinic books", err);
//   //     });
//   // }, [patientId]);

//   useEffect(() => {
//   const fetchClinicBooks = async () => {
//     try {
//       const res = patientId
//         ? await getClinicBooksByPatientId(patientId) // DOCTOR
//         : await getMyClinicBooks();                  // PATIENT

//       const mappedBooks = res.data.map((item) => ({
//         id: item.clinicBookId ?? item.id, // use real ID if available
//         doctorName: item.doctorFullName,
//         doctorNo: item.licenseNumber,
//         specialization: item.specialization,
//         medicationPurpose: item.visitReason,
//         access: item.accessControl,
//         lastUpdatedBy: item.updatedDoctor,
//         lastUpdated:
//           item.updatedTime === "Not updated yet"
//             ? new Date()
//             : item.updatedTime,
//       }));

//       setClinicBooks(mappedBooks);
//     } catch (err) {
//       console.error("Failed to load clinic books", err);
//     }
//   };

//   fetchClinicBooks();
// }, [patientId]);


//   return (
//     <>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
//         {clinicBooks.map((book) => (
//           <ClinicBookCard
//             key={book.id}
//             book={book}
//             onEdit={(b) => {
//               setMode("edit");
//               setEditingBook(b);
//             }}
//             onView={(b) => setOpenBook(b)}
//           />
//         ))}

//         {/* Doctor only UI (optional) */}
//         {patientId && (
//           <CreateClinicBookCard
//             onCreate={() => {
//               setMode("create");
//               setEditingBook({ patientId }); // ✅ pass patientId
//             }}
//           />

//         )}
//       </div>

//       {editingBook && (
//         <EditClinicBookModal
//           book={editingBook}
//           mode={mode}
//           onClose={() => setEditingBook(null)}
//           onSave={(b) => {
//             setClinicBooks((prev) =>
//               mode === "create"
//                 ? [b, ...prev]
//                 : prev.map((x) => (x.id === b.id ? b : x))
//             );
//             setEditingBook(null);
//           }}
//         />
//       )}

//       {openBook && (
//         <ClinicBookFlip
//           book={openBook}
//           onClose={() => setOpenBook(null)}
//         />
//       )}
//     </>
//   );
// }

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
  getClinicBooksByPatientId,
  getMyClinicBooks,
} from "../../../api/ClinicBookApi";

import ClinicBookCard from "./ClinicBookCard";
import ClinicBookFlip from "./ClinicBookFlip";
import EditClinicBookModal from "./EditClinicBookModal";
import CreateClinicBookCard from "./CreateClinicBookCard";

export default function MyClinicBooks() {
  const { patientId } = useParams();
  const [clinicBooks, setClinicBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [openBook, setOpenBook] = useState(null);
  const [mode, setMode] = useState("edit");

  /* -------------------- FETCH FROM BACKEND -------------------- */
  const fetchClinicBooks = useCallback(async () => {
    try {
      const res = patientId
        ? await getClinicBooksByPatientId(patientId) // DOCTOR
        : await getMyClinicBooks();                  // PATIENT

      const mapped = res.data.map((item) => ({
        id: item.id,
        patientId,
        doctorName: item.doctorFullName,
        doctorNo: item.licenseNumber,
        specialization: item.specialization,
        medicationPurpose: item.visitReason,
        access: item.accessControl,
        lastUpdatedBy: item.updatedDoctor,
        lastUpdated: item.updatedTime,
      }));

      setClinicBooks(mapped);
    } catch (err) {
      console.error("Failed to load clinic books", err);
    }
  }, [patientId]);

  /* -------------------- INITIAL LOAD -------------------- */
  useEffect(() => {
    fetchClinicBooks();
  }, [fetchClinicBooks]);

  /* -------------------- UI -------------------- */
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicBooks.map((book) => (
          <ClinicBookCard
            key={book.id}
            book={book}
            onEdit={(b) => {
              setMode("edit");
              setEditingBook(b);
            }}
            onView={(b) => setOpenBook(b)}
          />
        ))}

        {/* CREATE – DOCTOR ONLY */}
        {patientId && (
          <CreateClinicBookCard
            onCreate={() => {
              setMode("create");
              setEditingBook({ patientId });
            }}
          />
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {editingBook && (
        <EditClinicBookModal
          book={editingBook}
          mode={mode}
          onClose={() => setEditingBook(null)}
          onSuccess={() => {
            fetchClinicBooks();     // 🔥 AUTO-REFRESH
            setEditingBook(null);
          }}
          onDeleteSuccess={() => {
            fetchClinicBooks();     // 🔥 AUTO-REFRESH
            setEditingBook(null);
          }}
        />
      )}

      {/* VIEW */}
      {openBook && (
        <ClinicBookFlip
          book={openBook}
          onClose={() => setOpenBook(null)}
        />
      )}
    </>
  );
}
