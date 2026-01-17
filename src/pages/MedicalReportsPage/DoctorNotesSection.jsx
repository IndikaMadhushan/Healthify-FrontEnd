import { useState, useEffect, useCallback } from "react";

export default function DoctorNotesSection() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ✅ Wrap loadNotes in useCallback to stabilize its reference
  const loadNotes = useCallback(async () => {
    try {
      const result = await window.storage.list("doctor-notes:", false);
      if (!result || !result.keys) {
        setNotes([]);
        return;
      }

      const notesData = await Promise.all(
        result.keys.map(async (key) => {
          const item = await window.storage.get(key, false);
          return item ? JSON.parse(item.value) : null;
        }),
      );

      const validNotes = notesData
        .filter(Boolean)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setNotes(validNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
    }
  }, []); // ✅ Empty dependency array - function is stable

  // ✅ Now useEffect can safely depend on loadNotes
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleAdd = async () => {
    if (!newNote.trim()) return;

    setIsAdding(true);
    try {
      const noteData = {
        id: `note_${Date.now()}`,
        content: newNote.trim(),
        timestamp: new Date().toISOString(),
      };

      await window.storage.set(
        `doctor-notes:${noteData.id}`,
        JSON.stringify(noteData),
        false,
      );

      setNewNote("");
      await loadNotes();
    } catch (error) {
      console.error("Failed to add note:", error);
      alert("Failed to add note. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (!confirm("Delete this note?")) return;

    try {
      await window.storage.delete(`doctor-notes:${noteId}`, false);
      await loadNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Note */}
      <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm">
        <label className="text-[17px] font-semibold text-mainblack mb-2 block">
          Add Doctor's Note
        </label>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter medical notes, observations, or reminders..."
          className="w-full min-h-[100px] px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition"
        />
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdding || !newNote.trim()}
            className="px-4 py-2 bg-secondary text-white rounded-md text-[14px] font-semibold hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isAdding ? "Adding..." : "Add Note"}
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
            No doctor notes yet. Add your first note above.
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500">
                  {formatDate(note.timestamp)}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  className="text-xs text-red-600 hover:text-red-700 hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="text-[15px] text-gray-800 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
