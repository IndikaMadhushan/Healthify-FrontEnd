// src/components/GridOverlay.jsx
function GridOverlay() {
  // We don't need real content, just columns
  const cols = Array.from({ length: 12 }, (_, i) => i); // max (desktop) count

  return (
    <div className="fixed inset-0 z-100 pointer-events-none">
      {/* page width container */}
      <div className="w-full h-full flex justify-center">
        <div className="w-full h-full max-w-6xl px-4">
          <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-12 h-full gap-x-2 xl:gap-x-6">
            {cols.map((i) => (
              <div
                key={i}
                className="bg-pink-100/50"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridOverlay;
