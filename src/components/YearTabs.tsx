import { useState } from "react";
import type { Year, GradeName, GradesMap } from "../types";
import { calculateYearStats, GRADE_NAMES } from "../lib/gpa";
import SemesterCard from "./SemesterCard";
import GradeDistributionTable from "./GradeDistributionTable";

interface Props {
  years: Year[];
  grades: GradesMap;
  onGradeChange: (subjectId: string, grade: GradeName | undefined) => void;
}

export default function YearTabs({ years, grades, onGradeChange }: Props) {
  const [activeYear, setActiveYear] = useState(years[0]?.id ?? "");

  return (
    <div className="rounded-xl bg-white shadow-md">
      {/* Tab bar */}
      <div className="flex overflow-x-auto rounded-t-xl bg-indigo-700">
        {years.map((year) => {
          const stats = calculateYearStats(year, grades);
          const gpa = stats.gpa !== null ? stats.gpa.toFixed(2) : "0.00";
          const isActive = year.id === activeYear;
          return (
            <button
              key={year.id}
              onClick={() => setActiveYear(year.id)}
              className={`flex flex-1 flex-col items-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isActive
                  ? "bg-brand text-white"
                  : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
              }`}
            >
              <span>{year.label}</span>
              <span
                className="mt-0.5 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white"
                title={`${year.label} GPA`}
              >
                {gpa}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {years.map((year) => {
        if (year.id !== activeYear) return null;
        const stats = calculateYearStats(year, grades);

        return (
          <div key={year.id} className="p-4">
            <div className="grid gap-4 md:grid-cols-2">
              {year.semesters.map((sem) => (
                <SemesterCard
                  key={sem.id}
                  semester={sem}
                  grades={grades}
                  onGradeChange={onGradeChange}
                />
              ))}
            </div>

            {/* Year summary collapsible */}
            <details className="mt-4 rounded-lg border border-gray-200">
              <summary className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {year.label} Summary
              </summary>
              <div className="p-4">
                <div className="grid gap-6 xl:grid-cols-2">
                  <div>
                    <GradeDistributionTable
                      summary={stats.summary}
                      label="Results and Credits Distribution"
                    />
                  </div>
                  <div>
                    <h6 className="mb-2 text-sm font-semibold text-gray-700">
                      Credit Table
                    </h6>
                    <ul className="divide-y divide-gray-100 rounded border border-gray-200 text-sm">
                      <li className="flex justify-between px-3 py-2">
                        <span>Total credits of {year.label}</span>
                        <span className="font-semibold">{stats.earnedCredits}</span>
                      </li>
                      <li className="flex justify-between px-3 py-2">
                        <span>A or better credits</span>
                        <span className="font-semibold">
                          {(["A+", "A"] as const)
                            .reduce((s, g) => s + (stats.summary.get(g)?.credits ?? 0), 0)}
                        </span>
                      </li>
                      <li className="flex justify-between px-3 py-2">
                        <span>B or better credits</span>
                        <span className="font-semibold">
                          {(["A+", "A", "A-", "B+", "B"] as const)
                            .reduce((s, g) => s + (stats.summary.get(g)?.credits ?? 0), 0)}
                        </span>
                      </li>
                      <li className="flex justify-between px-3 py-2">
                        <span>C or better credits</span>
                        <span className="font-semibold">
                          {(GRADE_NAMES.filter((g) => {
                            const idx = GRADE_NAMES.indexOf(g);
                            return idx <= GRADE_NAMES.indexOf("C");
                          }) as typeof GRADE_NAMES)
                            .reduce((s, g) => s + (stats.summary.get(g)?.credits ?? 0), 0)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </div>
        );
      })}
    </div>
  );
}
