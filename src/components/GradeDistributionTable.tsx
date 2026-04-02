import type { GradeSummary } from "../types";
import { GRADE_NAMES } from "../lib/gpa";

interface Props {
  summary: GradeSummary;
  label?: string;
}

export default function GradeDistributionTable({ summary, label }: Props) {
  return (
    <div className="overflow-x-auto">
      {label && (
        <h6 className="mb-1 text-sm font-semibold text-gray-700">{label}</h6>
      )}
      <table className="w-full text-center text-xs">
        <thead>
          <tr className="bg-blue-600 text-white">
            {GRADE_NAMES.map((g) => (
              <th key={g} className="border border-blue-500 px-1 py-0.5">
                {g}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr title="Number of subjects">
            {GRADE_NAMES.map((g) => (
              <td key={g} className="border border-gray-200 px-1 py-0.5">
                {summary.get(g)?.count ?? 0}
              </td>
            ))}
          </tr>
          <tr title="Credits earned" className="bg-gray-50">
            {GRADE_NAMES.map((g) => (
              <td key={g} className="border border-gray-200 px-1 py-0.5">
                {summary.get(g)?.credits ?? 0}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
