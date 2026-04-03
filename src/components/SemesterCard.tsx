import type { Semester, GradeName, GradesMap } from "../types";
import { calculateSemesterStats } from "../lib/gpa";
import SubjectRow from "./SubjectRow";

interface Props {
  semester: Semester;
  grades: GradesMap;
  onGradeChange: (subjectId: string, grade: GradeName | undefined) => void;
}

export default function SemesterCard({ semester, grades, onGradeChange }: Props) {
  const stats = calculateSemesterStats(semester.subjects, grades);
  const gpaDisplay = stats.gpa !== null ? stats.gpa.toFixed(2) : "—";

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between rounded-t-lg bg-brand px-4 py-2 text-white">
        <span className="text-sm font-semibold">{semester.label}</span>
        <div className="flex gap-4 text-xs">
          <span>
            Credits: {stats.earnedCredits}/{stats.totalCredits}
          </span>
          <span>GPA: {gpaDisplay}</span>
        </div>
      </div>
      <div>
        {semester.subjects.map((subject) => (
          <SubjectRow
            key={subject.id}
            subject={subject}
            grades={grades}
            onGradeChange={onGradeChange}
          />
        ))}
      </div>
    </div>
  );
}
