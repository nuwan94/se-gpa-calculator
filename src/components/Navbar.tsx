interface Props {
  gpa: number | null;
  courseTitle: string;
  onReset: () => void;
  onExport: () => void;
  onImportFile: (file: File) => void;
  onToggleSidebar: () => void;
}

export default function Navbar({
  gpa,
  courseTitle,
  onReset,
  onExport,
  onImportFile,
  onToggleSidebar,
}: Props) {
  const gpaDisplay = gpa !== null ? gpa.toFixed(4) : "0.0000";

  return (
    <header className="sticky top-0 z-20 bg-brand shadow-md">
      <nav className="flex items-center gap-2 px-4 py-2" aria-label="Main navigation">
        {/* Logo */}
        <img src="/favicon.png" alt="Logo" className="h-8 w-8" />

        {/* GPA display */}
        <div className="flex-1 text-center">
          <span
            className="text-lg font-bold text-white"
            title={`${courseTitle} — GPA: ${gpaDisplay}`}
          >
            GPA: {gpaDisplay}
          </span>
        </div>

        {/* Desktop action buttons */}
        <div className="hidden items-center gap-1 md:flex">
          <label
            className="cursor-pointer rounded p-2 text-white hover:bg-brand-light focus-within:ring-2 focus-within:ring-white"
            title="Import grades"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <input
              type="file"
              accept=".json"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImportFile(file);
              }}
              aria-label="Import grades from file"
            />
          </label>

          <button
            onClick={onExport}
            className="rounded p-2 text-white hover:bg-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Export grades"
            aria-label="Export grades"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>

          <button
            onClick={onReset}
            className="rounded p-2 text-white hover:bg-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Reset all grades"
            aria-label="Reset all grades"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          <button
            onClick={onToggleSidebar}
            className="rounded p-2 text-white hover:bg-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Analysis"
            aria-label="Toggle analysis panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={onToggleSidebar}
          className="rounded p-2 text-white hover:bg-brand-light focus:outline-none md:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
