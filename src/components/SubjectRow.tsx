import type { Subject, GradeName, GradesMap } from "../types";
import GradeSelect from "./GradeSelect";
import SubjectTypeBadge from "./SubjectTypeBadge";

interface Props {
  subject: Subject;
  grades: GradesMap;
  onGradeChange: (subjectId: string, grade: GradeName | undefined) => void;
}

export default function SubjectRow({ subject, grades, onGradeChange }: Props) {
  const idPrefix = subject.id.slice(0, 9);
  const credits = subject.credits;
  const grade = grades[subject.id] as GradeName | undefined;

  return (
    <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2 even:bg-gray-50">
      <div className="w-28 shrink-0">
        <span className="text-xs text-gray-500">
          {idPrefix}
          <strong>{credits}</strong>
        </span>
        {subject.type && (
          <div className="mt-0.5">
            <SubjectTypeBadge type={subject.type} />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 text-sm text-gray-800">{subject.name}</div>
      <div className="w-24 shrink-0">
        <GradeSelect
          subjectId={subject.id}
          value={grade}
          onChange={onGradeChange}
        />
      </div>
    </div>
  );
}
