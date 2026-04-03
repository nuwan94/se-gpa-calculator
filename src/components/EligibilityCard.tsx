import type { Eligibility } from "../types";

const COLOR_CLASSES: Record<Eligibility["color"], string> = {
  green: "text-green-600",
  teal: "text-teal-600",
  blue: "text-blue-600",
  gray: "text-gray-500",
  red: "text-red-600",
};

interface Props {
  eligibility: Eligibility;
}

export default function EligibilityCard({ eligibility }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`mx-auto mb-2 h-12 w-12 ${COLOR_CLASSES[eligibility.color]}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
      <h5 className={`text-lg font-bold ${COLOR_CLASSES[eligibility.color]}`}>
        {eligibility.greeting}
      </h5>
      <p className="mt-1 text-sm text-gray-600">{eligibility.message}</p>
    </div>
  );
}
