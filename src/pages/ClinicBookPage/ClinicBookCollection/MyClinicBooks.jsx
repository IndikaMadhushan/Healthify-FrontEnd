// import { useState } from "react";
// import ClinicBookCard from "./ClinicBookCard";
// import EditClinicBookModal from "./EditClinicBookModal";
// import { clinicBooks as initialBooks } from "./clinicBooks";

// export default function MyClinicBooks() {
//   const [books, setBooks] = useState(initialBooks);
//   const [editingBook, setEditingBook] = useState(null);

//   const handleSave = (updatedBook) => {
//     setBooks((prev) =>
//       prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
//     );
//   };

//   const handleDelete = (id) => {
//     setBooks((prev) => prev.filter((b) => b.id !== id));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">My Clinic Books</h1>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <ClinicBookCard
//             key={book.id}
//             book={book}
//             onEdit={setEditingBook}
//           />
//         ))}
//       </div>

//       {editingBook && (
//         <EditClinicBookModal
//           book={editingBook}
//           onClose={() => setEditingBook(null)}
//           onSave={handleSave}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import { clinicBooks as data } from "./clinicBooks";
// import ClinicBookCard from "./ClinicBookCard";
// import EditClinicBookModal from "./EditClinicBookModal";
// import CreateClinicBookCard from "./CreateClinicBookCard";

// export default function MyClinicBooks() {
//   const [clinicBooks, setClinicBooks] = useState(data);
//   const [editingBook, setEditingBook] = useState(null);
//   const [mode, setMode] = useState("edit"); // ✅ NEW

//   const saveBook = (book) => {
//     if (mode === "create") {
//       setClinicBooks((prev) => [
//         {
//           ...book,
//           id: `CB${Date.now()}`,
//           doctorName: "Doctor Name",
//           doctorNo: "SLMC-XXXX",
//           specialization: "General Physician",
//           medicationPurpose: book.reason,
//           lastUpdatedBy: "Doctor",
//         },
//         ...prev,
//       ]);
//     } 
    
//     else {
//       setClinicBooks((prev) =>
//         prev.map((b) => (b.id === book.id ? book : b))
//       );
//     }

//     setEditingBook(null);
//     setMode("edit");
//   };

//   const deleteBook = (id) => {
//     setClinicBooks((prev) => prev.filter((b) => b.id !== id));
//     setEditingBook(null);
//   };

//   const openCreate = () => {
//     setMode("create");
//     setEditingBook({});
//   };

//   return (
//     <>
//     <div className="max-w-6xl mx-auto p-6">
//       {/* <h1 className="text-2xl font-bold mb-6 ">My Clinic Books</h1> */}

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {clinicBooks.map((book) => (
//           <ClinicBookCard
//             key={book.id}
//             book={book}
//             onEdit={(b) => {
//               setMode("edit");
//               setEditingBook(b);
//             }}
//           />
//         ))}

//         {/* ➕ CREATE CARD (DOCTOR ONLY UI) */}
//         <CreateClinicBookCard onCreate={openCreate} />
//       </div>

//       {editingBook && (
//         <EditClinicBookModal
//           book={editingBook}
//           mode={mode}
//           onClose={() => setEditingBook(null)}
//           onSave={saveBook}
//           onDelete={deleteBook}
//         />
//       )}
//     </div>
//     </>
//   );
// }


import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { clinicBooks as initialData } from "./clinicBooks";
import ClinicBookCard from "./ClinicBookCard";
import EditClinicBookModal from "./EditClinicBookModal";
import CreateClinicBookCard from "./CreateClinicBookCard";

export default function MyClinicBooks() {
  const [clinicBooks, setClinicBooks] = useState(initialData);
  const [editingBook, setEditingBook] = useState(null);
  const [mode, setMode] = useState("edit");

  /* ---------------- FILTER STATE ---------------- */

  const [showFilters, setShowFilters] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");

  /* ---------------- FILTER LOGIC ---------------- */

  const uniqueDoctors = [
    ...new Set(clinicBooks.map((b) => b.doctorName)),
  ];

  const filteredAndSortedClinicBooks = clinicBooks
    .filter((b) =>
      filterDoctor === "all" ? true : b.doctorName === filterDoctor
    )
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return sortOrder === "recent"
        ? dateB - dateA
        : dateA - dateB;
    });

  /* ---------------- CRUD LOGIC ---------------- */

  const saveBook = (book) => {
    if (mode === "create") {
      setClinicBooks((prev) => [
        {
          ...book,
          id: `CB${Date.now()}`,
          doctorName: "Samantha Silva",
          doctorNo: "SLMC-45872",
          specialization: "General Physician",
          medicationPurpose: book.reason, // ✅ reason = medication purpose
          lastUpdated: new Date().toISOString(),
          lastUpdatedBy: "Samantha Silva",
        },
        ...prev,
      ]);
    } else {
      setClinicBooks((prev) =>
        prev.map((b) => (b.id === book.id ? book : b))
      );
    }

    setEditingBook(null);
    setMode("edit");
  };

  const deleteBook = (id) => {
    setClinicBooks((prev) => prev.filter((b) => b.id !== id));
    setEditingBook(null);
  };

  const openCreate = () => {
    setMode("create");
    setEditingBook({});
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Mobile Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
          >
            <FaFilter />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filters */}
          <div
            className={`flex flex-col md:flex-row gap-4 w-full md:w-auto ${
              showFilters ? "block" : "hidden md:flex"
            }`}
          >
            {/* Doctor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Filter by Doctor
              </label>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="w-full md:w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              >
                <option value="all">All Doctors</option>
                {uniqueDoctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Sort by Date
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full md:w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Count */}
          <div className="text-sm text-gray-600 font-medium">
            {filteredAndSortedClinicBooks.length}{" "}
            {filteredAndSortedClinicBooks.length === 1
              ? "clinic book"
              : "clinic books"}{" "}
            found
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CLINIC BOOKS */}
        {filteredAndSortedClinicBooks.map((book) => (
          <ClinicBookCard
            key={book.id}
            book={book}
            onEdit={(b) => {
              setMode("edit");
              setEditingBook(b);
            }}
          />
        ))}

        {/* ➕ CREATE CARD (ALWAYS VISIBLE, NOT FILTERED) */}
        {/* <CreateClinicBookCard onCreate={openCreate} /> */}
      </div>

      {/* MODAL */}
      {editingBook && (
        <EditClinicBookModal
          book={editingBook}
          mode={mode}
          onClose={() => setEditingBook(null)}
          onSave={saveBook}
          onDelete={deleteBook}
        />
      )}
    </div>
  );
}