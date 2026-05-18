import { useState, useMemo } from "react";
import courseData from "./data/se-2024.json";
import type { CourseConfig, GradeName } from "./types";
import { calculateOverallStats } from "./lib/gpa";
import { exportGrades, importGrades } from "./lib/storage";
import { useCalculatorStore } from "./store/calculatorStore";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import YearTabs from "./components/YearTabs";
import ResetDialog from "./components/ResetDialog";

const course = courseData as CourseConfig;

export default function App() {
  const { grades, setGrade, importGrades: storeImport, reset } = useCalculatorStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const overallStats = useMemo(
    () => calculateOverallStats(course.years, grades),
    [grades]
  );

  function handleGradeChange(subjectId: string, grade: GradeName | undefined) {
    setGrade(subjectId, grade);
  }

  function handleExport() {
    exportGrades(grades);
  }

  async function handleImportFile(file: File) {
    setImportError(null);
    try {
      const imported = await importGrades(file);
      storeImport(imported);
      setSidebarOpen(false);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed");
    }
  }

  function handleReset() {
    setResetDialogOpen(true);
  }

  function confirmReset() {
    reset();
    setResetDialogOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar
        gpa={overallStats.gpa}
        courseTitle={course.name}
        onReset={handleReset}
        onExport={handleExport}
        onImportFile={handleImportFile}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      <div className="flex flex-1">
        {/* Main content */}
        <main className="min-w-0 flex-1 p-4">
          {importError && (
            <div
              role="alert"
              className="mb-4 flex items-center justify-between rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700"
            >
              <span>{importError}</span>
              <button
                onClick={() => setImportError(null)}
                className="ml-4 font-semibold hover:text-red-900"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}
          <YearTabs
            years={course.years}
            grades={grades}
            onGradeChange={handleGradeChange}
          />
        </main>

        {/* Desktop sidebar (always visible on large screens) */}
        <div className="hidden w-72 shrink-0 border-l border-gray-200 bg-white lg:block">
          <Sidebar
            courseTitle={course.name}
            stats={overallStats}
            isOpen={true}
            onClose={() => setSidebarOpen(false)}
            onReset={handleReset}
            onExport={handleExport}
            onImportFile={handleImportFile}
          />
        </div>
      </div>

      {/* Mobile sidebar (slide-over) */}
      <div className="lg:hidden">
        <Sidebar
          courseTitle={course.name}
          stats={overallStats}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onReset={handleReset}
          onExport={handleExport}
          onImportFile={handleImportFile}
        />
      </div>

      <footer className="bg-brand py-3 text-center text-xs text-gray-400">
        GPA Calculator — {course.name} &nbsp;·&nbsp;{" "}
        <a
          href="https://github.com/nuwan94/se-gpa-calculator"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 underline hover:text-white"
        >
          View Source
        </a>
        &nbsp;·&nbsp;{" "}
        <a
          href="https://nuwan.dev"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 underline hover:text-white"
        >
          Nuwan94
        </a>{" "}
        © 2018
      </footer>

      <ResetDialog
        isOpen={resetDialogOpen}
        onCancel={() => setResetDialogOpen(false)}
        onConfirm={confirmReset}
      />
    </div>
  );
}
