import type { OverallStats } from "../types";
import GradeDistributionTable from "./GradeDistributionTable";
import EligibilityCard from "./EligibilityCard";
import { getEligibility } from "../lib/gpa";

interface Props {
  courseTitle: string;
  stats: OverallStats;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onExport: () => void;
  onImportFile: (file: File) => void;
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-indigo-500 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function Sidebar({
  courseTitle,
  stats,
  isOpen,
  onClose,
  onReset,
  onExport,
  onImportFile,
}: Props) {
  const eligibility = getEligibility(stats.gpa);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-72 overflow-y-auto bg-white shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Analysis panel"
      >
        <div className="border-b border-gray-200 bg-brand px-4 py-3 text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Analysis</span>
            <button
              onClick={onClose}
              className="rounded p-1 hover:bg-brand-light focus:outline-none lg:hidden"
              aria-label="Close sidebar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-4 p-4">
          {/* Mobile-only action buttons */}
          <div className="flex gap-2 lg:hidden">
            <button
              onClick={onReset}
              className="flex-1 rounded bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              onClick={onExport}
              className="flex-1 rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
            >
              Export
            </button>
            <label className="flex-1 cursor-pointer rounded bg-teal-600 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-teal-700">
              Import
              <input
                type="file"
                accept=".json"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImportFile(file);
                }}
              />
            </label>
          </div>

          {/* Course title */}
          <p className="text-xs text-gray-500">{courseTitle}</p>

          {/* Overall progress */}
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Overall
            </h3>
            <p className="text-sm text-gray-700">
              Credits:{" "}
              <strong>
                {stats.earnedCredits}{" "}
                <span className="font-normal text-gray-400">
                  / {stats.totalCredits}
                </span>
              </strong>
            </p>
            <ProgressBar value={stats.earnedCredits} max={stats.totalCredits} />
            <p className="mt-2 text-sm text-gray-700">
              Subjects:{" "}
              <strong>
                {stats.earnedSubjects}{" "}
                <span className="font-normal text-gray-400">
                  / {stats.totalSubjects}
                </span>
              </strong>
            </p>
            <ProgressBar
              value={stats.earnedSubjects}
              max={stats.totalSubjects}
            />
          </section>

          <div className="border-t border-gray-100" />

          {/* Grade distribution */}
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Grades
            </h3>
            <GradeDistributionTable summary={stats.summary} />
          </section>

          <div className="border-t border-gray-100" />

          {/* Eligibility */}
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Eligibility
            </h3>
            <EligibilityCard eligibility={eligibility} />
          </section>
        </div>
      </aside>
    </>
  );
}
