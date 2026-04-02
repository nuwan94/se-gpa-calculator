interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ResetDialog({ isOpen, onCancel, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-dialog-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-2 h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <h4 id="reset-dialog-title" className="text-xl font-bold text-gray-800">
            Are you sure?
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            All your grade data will be deleted and reset to empty status. This
            action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
