export type SubjectType = "o" | "n" | "m" | "d" | "h" | "b" | "g";

export type GradeName =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "E";

export interface GradeOption {
  name: GradeName;
  value: number;
}

export interface Subject {
  id: string;
  name: string;
  credits: number;
  type?: SubjectType;
}

export interface Semester {
  id: string;
  label: string;
  subjects: Subject[];
}

export interface Year {
  id: string;
  label: string;
  semesters: Semester[];
}

export interface CourseConfig {
  id: string;
  name: string;
  years: Year[];
}

export interface GradeStat {
  count: number;
  credits: number;
}

export type GradeSummary = Map<GradeName, GradeStat>;

export interface SemesterStats {
  earnedCredits: number;
  totalCredits: number;
  gpa: number | null;
}

export interface YearStats {
  earnedCredits: number;
  gpa: number | null;
  summary: GradeSummary;
}

export interface OverallStats {
  earnedCredits: number;
  totalCredits: number;
  earnedSubjects: number;
  totalSubjects: number;
  gpa: number | null;
  summary: GradeSummary;
}

export interface Eligibility {
  greeting: string;
  message: string;
  color: "green" | "teal" | "blue" | "gray" | "red";
}

export type GradesMap = Record<string, GradeName>;
