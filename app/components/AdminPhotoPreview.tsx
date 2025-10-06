"use client";

interface AdminPhotoPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  onEdit: () => void;
}

export default function AdminPhotoPreview({
  isOpen,
  onClose,
  photoUrl,
  onEdit
}: AdminPhotoPreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Photo Preview - Zoomed */}
      <div className="relative z-10 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Photo */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-500/50">
          <img
            src={photoUrl}
            alt="Profile Preview"
            className="w-64 h-64 sm:w-80 sm:h-80 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/profile.jpg';
            }}
          />
        </div>

        {/* Edit Button */}
        <button
          onClick={() => {
            onClose();
            onEdit();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

