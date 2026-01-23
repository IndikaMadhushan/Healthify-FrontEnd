import ClinicBookCard from "./ClinicBookCard";
import { clinicBooks } from "./clinicBooks";

export default function MyClinicBooks() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">
        My Clinic Books
      </h1>

      {clinicBooks.length === 0 ? (
        <p className="text-gray-500">No clinic books available</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicBooks.map((book) => (
            <ClinicBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}