
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";

/* ================= HELPERS ================= */

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve({ blob, dataUrl: reader.result });
      reader.readAsDataURL(blob);
    }, "image/jpeg", 0.92);
  });
}

/* ================= COMPONENT ================= */

export default function ProfileImageCropper({ onCropped }) {
  // const inputRef = useRef(null);
  const modalInputRef = useRef(null);

  const [src, setSrc] = useState(null);
  const [profileSrc, setProfileSrc] = useState(null);
  const [ setFile] = useState(null);

  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pendingSrc, setPendingSrc] = useState(null);
  const [pendingVisible, setPendingVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
  const MAX_BYTES = 5 * 1024 * 1024;

  const hasCustomPhoto = Boolean(profileSrc);

  /* ========== FILE SELECT ========== */

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!ACCEPTED.includes(f.type)) {
      alert("Only JPG, PNG, WEBP allowed");
      return;
    }
    if (f.size > MAX_BYTES) {
      alert("Maximum file size is 5MB");
      return;
    }

    const url = URL.createObjectURL(f);
    setFile(f);
    setSrc(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  /* ========== SAVE IMAGE ========== */

  const handleSave = async () => {
    if (!src || !croppedAreaPixels) return;

    setLoading(true);
    const { blob, dataUrl } = await getCroppedImg(src, croppedAreaPixels);
    const croppedFile = new File([blob], "profile.jpg", { type: blob.type });

    setPendingSrc(dataUrl);
    setPendingVisible(false);
    requestAnimationFrame(() => setPendingVisible(true));

    setTimeout(() => {
      setProfileSrc(dataUrl);
      setSrc(dataUrl);
      setFile(croppedFile);
      setPendingSrc(null);
      setPendingVisible(false);
      setShowCrop(false);
      onCropped?.(croppedFile, dataUrl);
    }, 500);

    setLoading(false);
  };

  /* ========== REMOVE IMAGE ========== */

  const handleRemove = () => {
    setProfileSrc(null);
    setSrc(null);
    setFile(null);
    setShowCrop(false);
    setPendingSrc(null);
    setPendingVisible(false);
  };

  return (
    <div className="">

      {/* ===== PROFILE IMAGE ===== */}
      <div className="flex items-center justify-center gap-4 ">
        <div
          className="relative lg:w-35 lg:h-35 w-30 h-30  rounded-full border border-[#D3F0ED] overflow-hidden bg-[#F7FCFB] cursor-pointer group  "
          onClick={() => setShowCrop(true)}
        >

          {/* default photo */}
          <img
            src={profileSrc || "/profilePic.png"}
            alt="Profile"
            className="w-full h-full object-cover transition-opacity"
            style={{
              opacity: pendingSrc ? (pendingVisible ? 0 : 1) : 1
            }}
          />

          {pendingSrc && (
            <img
              src={pendingSrc}
              alt="New"
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
              style={{ opacity: pendingVisible ? 1 : 0 }}
            />
          )}

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="text-white text-xs font-medium">Edit</span>
          </div>
        </div>

        
      </div>

      {/* ===== CROP MODAL ===== */}
      {showCrop && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-[#0F4F52]">
                Profile Photo
              </h2>
            </div>

            <div className="relative h-[280px] bg-gray-100">
              <Cropper
                image={src || "/profilePic.png"}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="px-6 py-4 space-y-2">

              {/* Choose photo - always */}
              <button className="relative w-full px-4 py-2 text-sm rounded-lg bg-[#F2FBFA] hover:bg-[#EAF7F6]">
                Choose photo
                <input
                  ref={modalInputRef}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onFileChange}
                />
              </button>

              {/* Save only if image selected */}
              {src && croppedAreaPixels && (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full px-4 py-2 rounded-lg bg-[#18AAB0] text-white text-sm"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              )}

              {/* Cancel always */}
              <button
                onClick={() => setShowCrop(false)}
                className="w-full px-4 py-2 rounded-lg border text-sm"
              >
                Cancel
              </button>

              {/* Delete only if custom photo */}
              {hasCustomPhoto && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  Delete photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM ===== */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold">
              Delete profile photo?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Your profile image will be reset to default.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm border rounded-lg"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
                onClick={() => {
                  handleRemove();
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}