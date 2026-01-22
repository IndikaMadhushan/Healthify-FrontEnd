//thathsara
// src/pages/DoctorNotesPage/AllDoctorNotes.jsx

import { useState } from "react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
} from "react-icons/fa";
import { dummyDoctorNotes } from "./dummyDoctorNotes";

export default function AllDoctorNotes() {
  const [notes] = useState(dummyDoctorNotes);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [sortOrder, setSortOrder] = useState("recent"); // 'recent' or 'oldest'
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique doctors for filter
  const uniqueDoctors = [...new Set(notes.map((note) => note.doctorName))];

  // Filter and sort notes
  const filteredAndSortedNotes = notes
    .filter(
      (note) => filterDoctor === "all" || note.doctorName === filterDoctor,
    )
    .sort((a, b) => {
      const dateA = new Date(a.visitDate);
      const dateB = new Date(b.visitDate);
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });

  const toggleNote = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-4 rounded-xl bg-gray-50 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl">
              📝
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 drop-shadow-sm">
              Doctor Notes
            </h1>
          </div>

          <p className="text-teal-800 ml-13">
            View all medical notes from your healthcare providers
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Filters */}
            <div
              className={`flex flex-col md:flex-row gap-4 w-full md:w-auto ${showFilters ? "block" : "hidden md:flex"}`}
            >
              {/* Doctor Filter */}
              <div className="flex-1 md:flex-initial">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Filter by Doctor
                </label>
                <select
                  value={filterDoctor}
                  onChange={(e) => setFilterDoctor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                >
                  <option value="all">All Doctors</option>
                  {uniqueDoctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="flex-1 md:flex-initial">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Sort by Date
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 font-medium">
              {filteredAndSortedNotes.length}{" "}
              {filteredAndSortedNotes.length === 1 ? "note" : "notes"} found
            </div>
          </div>
        </div>

        {/* Notes List */}
        {filteredAndSortedNotes.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserMd className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Doctor Notes Found
            </h3>
            <p className="text-gray-500">
              {filterDoctor === "all"
                ? "You don't have any doctor notes yet."
                : `No notes found from ${filterDoctor}.`}
            </p>
          </div>
        ) : (
          // Notes Cards
          <div className="space-y-4">
            {filteredAndSortedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Note Header - Always Visible */}
                <div
                  onClick={() => toggleNote(note.id)}
                  className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Doctor Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {getInitials(note.doctorName)}
                      </div>
                    </div>

                    {/* Doctor Info & Note Preview */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-mainblack">
                            {note.doctorName}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaUserMd className="text-secondary" />
                            {note.specialization}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaCalendarAlt className="text-secondary" />
                          <span className="font-medium">
                            {formatDate(note.visitDate)}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className="hidden md:inline">
                            {note.visitTime}
                          </span>
                        </div>
                      </div>

                      {/* Diagnosis Badge */}
                      {/* <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                          {note.diagnosis}
                        </span>
                      </div>

                      {/* Note Preview */}
                      <p
                        className={`text-gray-700 ${expandedNoteId === note.id ? "" : "line-clamp-2"}`}
                      >
                        {note.note}
                      </p>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="flex-shrink-0 text-gray-400">
                      {expandedNoteId === note.id ? (
                        <FaChevronUp className="text-xl" />
                      ) : (
                        <FaChevronDown className="text-xl" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Note Details */}
                {expandedNoteId === note.id && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-gray-100 bg-gray-50">
                    <div className="pl-16 md:pl-18">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Complete Note:
                      </h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {note.note}
                      </p>

                      {/* Visit Details */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">
                              Visit Date:
                            </span>
                            <p className="text-gray-600">
                              {formatDate(note.visitDate)}
                            </p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">
                              Visit Time:
                            </span>
                            <p className="text-gray-600">{note.visitTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
