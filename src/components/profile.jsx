import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";

/*
  ProfileImageCropperNoSlider
  - Default image: /profilePic.png (public folder)
  - Edit opens modal; Choose photo -> crop -> Save updates main image with cross-fade
  - Profile circle changes ONLY after Save
  - No visible zoom slider, mouse-wheel + pinch zoom supported
*/

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = Math.round(pixelCrop.width);
  canvas.height = Math.round(pixelCrop.height);

  ctx.drawImage(
    image,
    Math.round(pixelCrop.x),
    Math.round(pixelCrop.y),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height),
    0,
    0,
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height)
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({ blob, dataUrl: reader.result });
        reader.readAsDataURL(blob);
      },
      "image/jpeg",
      0.92
    );
  });
}

export default function ProfileImageCropperNoSlider({ onCropped }) {
  const inputRef = useRef(null); // parent hidden input (circle)
  const modalInputRef = useRef(null); // modal choose input

  const [src, setSrc] = useState(null);              // temp image for cropper
  const [profileSrc, setProfileSrc] = useState(null); // committed profile photo
  const [file, setFile] = useState(null);

  const [showCrop, setShowCrop] = useState(false); // crop modal visible
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom] = useState(1);
  const [maxZoom] = useState(3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  // CROSSFADE STATES
  const [pendingSrc, setPendingSrc] = useState(null); // new image to fade in
  const [pendingVisible, setPendingVisible] = useState(false);

  // track if user already chose an image from modal
  const [hasChosenInModal, setHasChosenInModal] = useState(false);

  // ⭐ NEW: professional delete confirmation modal toggle
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
  const MAX_BYTES = 5 * 1024 * 1024; // 5MB

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const triggerInput = () => inputRef.current?.click();

  // fromModal = true → called from modal "Choose a photo"
  const onFileChange = (e, fromModal = false) => {
    const input = e.target;
    const f = input.files?.[0];
    if (!f) {
      input.value = "";
      return;
    }

    if (!ACCEPTED.includes(f.type)) {
      alert("Only JPG / PNG / WEBP allowed");
      input.value = "";
      return;
    }
    if (f.size > MAX_BYTES) {
      alert("File too large (max 5 MB)");
      input.value = "";
      return;
    }

    const url = URL.createObjectURL(f);
    setFile(f);
    setSrc(url); // only cropper image changes
    setCroppedAreaPixels(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setShowCrop(true);

    if (fromModal) {
      setHasChosenInModal(true);
    } else {
      setHasChosenInModal(false);
    }

    input.value = "";
  };

  const onCropComplete = useCallback((_, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

  const onWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const zoomChange = delta > 0 ? 0.08 : -0.08;
    setZoom((z) =>
      clamp(Number((z + zoomChange).toFixed(2)), minZoom, maxZoom)
    );
  };

  // Save with cross-fade + commit to profileSrc
  const handleSave = useCallback(
    async () => {
      if (!src || !croppedAreaPixels) {
        alert("Please choose and crop the image before saving.");
        return;
      }
      setLoading(true);
      try {
        const { blob, dataUrl } = await getCroppedImg(
          src,
          croppedAreaPixels
        );
        const croppedFile = new File(
          [blob],
          file ? `cropped_${file.name}` : "profile.jpg",
          { type: blob.type }
        );

        setPendingSrc(dataUrl);
        setPendingVisible(false);

        requestAnimationFrame(() => {
          setPendingVisible(true);
        });

        setTimeout(() => {
          setFile(croppedFile);
          setProfileSrc(dataUrl); // committed profile image
          setSrc(dataUrl);        // used for next edit

          setPendingSrc(null);
          setPendingVisible(false);
          setShowCrop(false);
          setHasChosenInModal(false);

          if (onCropped) onCropped(croppedFile, dataUrl);
        }, 520);
      } catch (err) {
        console.error("Crop failed", err);
        alert("Could not crop image — try again.");
      } finally {
        setLoading(false);
      }
    },
    [src, croppedAreaPixels, file, onCropped]
  );

  const handleRemove = () => {
    if (src && src.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(src);
      } catch (_) {}
    }
    setSrc(null);
    setProfileSrc(null);
    setFile(null);
    setShowCrop(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setPendingSrc(null);
    setPendingVisible(false);
    setHasChosenInModal(false);

    if (inputRef.current) inputRef.current.value = "";
    if (modalInputRef.current) modalInputRef.current.value = "";
  };

  return (
    <div className="px-2">
      <label className="text-[20px] font-medium block mb-2">
        Profile Photo
      </label>

      {/* hidden parent input (clickable circle) */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileChange(e, false)}
      />

      {/* preview circle (two layered images for cross-fade) */}
      <div
        className="relative mt-2 w-[300px] h-[300px] rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer bg-white hover:border-indigo-400 transition overflow-hidden"
        onClick={triggerInput}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") triggerInput();
        }}
        aria-label="Upload profile"
      >
        {/* current committed profile image */}
        <img
          src={profileSrc || "/profilePic.png"}
          alt="profile preview"
          className="object-cover h-full w-full transition-opacity duration-500 ease-in-out"
          style={{
            opacity: pendingSrc ? (pendingVisible ? 0 : 1) : 1,
          }}
        />

        {/* pending (new) image layered on top; will fade in on Save */}
        {pendingSrc && (
          <img
            src={pendingSrc}
            alt="new preview"
            className="absolute inset-0 object-cover h-full w-full transition-opacity duration-500 ease-in-out"
            style={{ opacity: pendingVisible ? 1 : 0 }}
          />
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowCrop(true);
            setHasChosenInModal(false);
          }}
          className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm border shadow-sm hover:bg-opacity-100"
        >
          Edit
        </button>
      </div>

      {/* Crop modal */}
      {showCrop && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-[300px] md:w-[500px] max-w-3xl overflow-hidden shadow-xl">
            <div className="p-4">
              <div
                className="relative w-full h-50 bg-gray-100 rounded-xl"
                onWheel={onWheel}
              >
                <Cropper
                  image={src ? src : "/profilePic.png"}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
                <div className="absolute bottom-2 left-2 text-xs md:block hidden text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                  Drag to move · Scroll / pinch to zoom
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {/* Choose a photo (modal) – only show BEFORE first selection */}
                {!hasChosenInModal && (
                  <button
                    className="px-4 py-2 rounded-lg relative text-start text-sm bg-primary/30 hover:bg-primary/40 "
                  >
                    Choose a photo
                    <input
                      ref={modalInputRef}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => onFileChange(e, true)}
                    />
                  </button>
                )}

                {/* Save button visible when we have a src (selected image or existing) */}
                {src && (
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg text-start text-sm hover:bg-gray-50  active:bg-gray-100"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowCrop(false);
                    setHasChosenInModal(false);
                  }}
                  className="px-4 py-2  rounded-lg text-start text-sm hover:bg-gray-50 active:bg-gray-100"
                >
                  Cancel
                </button>

                {/* Delete only if user has custom photo */}
                {profileSrc && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(true); // open confirm modal
                    }}
                    className="px-4 py-2 rounded-lg text-sm   hover:bg-red-50 text-red-600  active:bg-red-100 text-start"
                  >
                    Delete Photo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ Professional Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-2xl">!</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Delete profile photo?
              </h2>
              <p className="text-sm text-gray-600">
                This action cannot be undone. Your profile photo will be reset
                to the default image.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700"
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