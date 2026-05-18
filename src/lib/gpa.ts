import type {
  GradeName,
  GradeOption,
  GradeSummary,
  GradeStat,
  Eligibility,
  Year,
  SemesterStats,
  YearStats,
  OverallStats,
  GradesMap,
} from "../types";

export const GRADE_OPTIONS: GradeOption[] = [
  { name: "A+", value: 4.0 },
  { name: "A", value: 4.0 },
  { name: "A-", value: 3.7 },
  { name: "B+", value: 3.3 },
  { name: "B", value: 3.0 },
  { name: "B-", value: 2.7 },
  { name: "C+", value: 2.3 },
  { name: "C", value: 2.0 },
  { name: "C-", value: 1.7 },
  { name: "D+", value: 1.3 },
  { name: "D", value: 1.0 },
  { name: "E", value: 0.0 },
];

export const GRADE_VALUE_MAP: Record<GradeName, number> = Object.fromEntries(
  GRADE_OPTIONS.map((g) => [g.name, g.value])
) as Record<GradeName, number>;

export const GRADE_NAMES: GradeName[] = GRADE_OPTIONS.map((g) => g.name);

function buildEmptySummary(): GradeSummary {
  const map: GradeSummary = new Map();
  for (const g of GRADE_NAMES) {
    map.set(g, { count: 0, credits: 0 });
  }
  return map;
}

function addToSummary(
  summary: GradeSummary,
  grade: GradeName,
  credits: number
): void {
  const existing: GradeStat = summary.get(grade) ?? { count: 0, credits: 0 };
  summary.set(grade, {
    count: existing.count + 1,
    credits: existing.credits + credits,
  });
}

function safeDivide(numerator: number, denominator: number): number | null {
  return denominator > 0 ? numerator / denominator : null;
}

export function calculateSemesterStats(
  subjects: Year["semesters"][number]["subjects"],
  grades: GradesMap
): SemesterStats {
  let earnedGpa = 0;
  let earnedCredits = 0;
  let totalCredits = 0;

  for (const subject of subjects) {
    totalCredits += subject.credits;
    const grade = grades[subject.id];
    if (grade !== undefined) {
      const value = GRADE_VALUE_MAP[grade];
      earnedGpa += value * subject.credits;
      earnedCredits += subject.credits;
    }
  }

  return {
    earnedCredits,
    totalCredits,
    gpa: safeDivide(earnedGpa, earnedCredits),
  };
}

export function calculateYearStats(year: Year, grades: GradesMap): YearStats {
  let earnedGpa = 0;
  let earnedCredits = 0;
  const summary = buildEmptySummary();

  for (const sem of year.semesters) {
    for (const subject of sem.subjects) {
      const grade = grades[subject.id];
      if (grade !== undefined) {
        const value = GRADE_VALUE_MAP[grade];
        earnedGpa += value * subject.credits;
        earnedCredits += subject.credits;
        addToSummary(summary, grade, subject.credits);
      }
    }
  }

  return {
    earnedCredits,
    gpa: safeDivide(earnedGpa, earnedCredits),
    summary,
  };
}

export function calculateOverallStats(
  years: Year[],
  grades: GradesMap
): OverallStats {
  let earnedGpa = 0;
  let earnedCredits = 0;
  let totalCredits = 0;
  let earnedSubjects = 0;
  let totalSubjects = 0;
  const summary = buildEmptySummary();

  for (const year of years) {
    for (const sem of year.semesters) {
      for (const subject of sem.subjects) {
        totalCredits += subject.credits;
        totalSubjects += 1;
        const grade = grades[subject.id];
        if (grade !== undefined) {
          const value = GRADE_VALUE_MAP[grade];
          earnedGpa += value * subject.credits;
          earnedCredits += subject.credits;
          earnedSubjects += 1;
          addToSummary(summary, grade, subject.credits);
        }
      }
    }
  }

  return {
    earnedCredits,
    totalCredits,
    earnedSubjects,
    totalSubjects,
    gpa: safeDivide(earnedGpa, earnedCredits),
    summary,
  };
}

export function getEligibility(gpa: number | null): Eligibility {
  if (gpa === null) {
    return {
      greeting: "Hello!",
      message: "Enter your grades to see your eligibility.",
      color: "gray",
    };
  }
  if (gpa >= 3.7) {
    return {
      greeting: "Brilliant!",
      message: 'You are maintaining a "First Class" degree. Keep it up!',
      color: "green",
    };
  }
  if (gpa >= 3.3) {
    return {
      greeting: "Very Good!",
      message:
        'Currently you are in "Second Upper" degree level. Try a little more to reach "First Class".',
      color: "teal",
    };
  }
  if (gpa >= 3.0) {
    return {
      greeting: "Good!",
      message: 'Currently you are in "Second Lower" degree level. Keep going.',
      color: "blue",
    };
  }
  if (gpa >= 2.0) {
    return {
      greeting: "Hmmm...",
      message: 'Is "General Degree" enough for you? Work hard! You can do better.',
      color: "gray",
    };
  }
  return {
    greeting: "Sorry!",
    message: "Currently you are not eligible for the degree.",
    color: "red",
  };
}

export function gradeColorClass(grade: GradeName): string {
  const value = GRADE_VALUE_MAP[grade];
  if (value >= 4.0) return "bg-green-400 text-white";
  if (value >= 3.0) return "bg-cyan-400 text-white";
  if (value >= 2.0) return "bg-amber-300 text-gray-800";
  return "bg-lime-200 text-gray-800";
}
