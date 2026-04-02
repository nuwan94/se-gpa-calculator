import type { GradeName } from "../types";
import { GRADE_OPTIONS, gradeColorClass } from "../lib/gpa";

interface Props {
  subjectId: string;
  value: GradeName | undefined;
  onChange: (subjectId: string, grade: GradeName | undefined) => void;
}

export default function GradeSelect({ subjectId, value, onChange }: Props) {
  return (
    <select
      aria-label="Select grade"
      value={value ?? ""}
      onChange={(e) => {
        const v = e.target.value as GradeName | "";
        onChange(subjectId, v === "" ? undefined : v);
      }}
      className={`w-full rounded border border-gray-300 px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 ${value ? gradeColorClass(value) : "bg-white text-gray-500"}`}
    >
      <option value="">-</option>
      {GRADE_OPTIONS.map((g) => (
        <option key={g.name} value={g.name}>
          {g.name}
        </option>
      ))}
    </select>
  );
}
