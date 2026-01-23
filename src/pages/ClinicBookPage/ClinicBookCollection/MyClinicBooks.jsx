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

import { useState } from "react";
import { clinicBooks as data } from "./clinicBooks";
import ClinicBookCard from "./ClinicBookCard";
import EditClinicBookModal from "./EditClinicBookModal";
import CreateClinicBookCard from "./CreateClinicBookCard";

export default function MyClinicBooks() {
  const [clinicBooks, setClinicBooks] = useState(data);
  const [editingBook, setEditingBook] = useState(null);
  const [mode, setMode] = useState("edit"); // ✅ NEW

  const saveBook = (book) => {
    if (mode === "create") {
      setClinicBooks((prev) => [
        {
          ...book,
          id: `CB${Date.now()}`,
          doctorName: "Doctor Name",
          doctorNo: "SLMC-XXXX",
          specialization: "General Physician",
          medicationPurpose: book.reason,
          lastUpdatedBy: "Doctor",
        },
        ...prev,
      ]);
    } 
    
    else {
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

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
      {/* <h1 className="text-2xl font-bold mb-6 ">My Clinic Books</h1> */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicBooks.map((book) => (
          <ClinicBookCard
            key={book.id}
            book={book}
            onEdit={(b) => {
              setMode("edit");
              setEditingBook(b);
            }}
          />
        ))}

        {/* ➕ CREATE CARD (DOCTOR ONLY UI) */}
        <CreateClinicBookCard onCreate={openCreate} />
      </div>

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
    </>
  );
}
