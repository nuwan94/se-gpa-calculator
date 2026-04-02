import type { SubjectType } from "../types";

const TYPE_LABELS: Record<SubjectType, string> = {
  o: "Optional",
  n: "Net",
  m: "Mobile",
  d: "Data",
  h: "Health",
  b: "Business",
  g: "Gaming",
};

const TYPE_COLORS: Record<SubjectType, string> = {
  o: "bg-gray-700",
  n: "bg-indigo-600",
  m: "bg-green-600",
  d: "bg-red-400",
  h: "bg-amber-500",
  b: "bg-teal-700",
  g: "bg-purple-900",
};

interface Props {
  type: SubjectType;
}

export default function SubjectTypeBadge({ type }: Props) {
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 text-xs font-semibold text-white ${TYPE_COLORS[type]}`}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}
