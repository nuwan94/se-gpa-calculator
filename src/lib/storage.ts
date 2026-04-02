import type { GradesMap } from "../types";

const STORAGE_KEY = "gpa-calc-grades";
const SCHEMA_VERSION = 1;

interface PersistedData {
  version: number;
  grades: GradesMap;
}

export function loadGrades(): GradesMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "version" in parsed &&
      "grades" in parsed &&
      typeof (parsed as PersistedData).grades === "object"
    ) {
      return (parsed as PersistedData).grades ?? {};
    }
    return {};
  } catch {
    return {};
  }
}

export function saveGrades(grades: GradesMap): void {
  const data: PersistedData = { version: SCHEMA_VERSION, grades };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearGrades(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportGrades(grades: GradesMap): void {
  const data: PersistedData = { version: SCHEMA_VERSION, grades };
  const json = JSON.stringify(data, null, 2);
  const date = new Date().toISOString().split("T")[0];
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gpa-calc-export-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importGrades(file: File): Promise<GradesMap> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== "string") throw new Error("Could not read file");
        const parsed: unknown = JSON.parse(text);
        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "grades" in parsed &&
          typeof (parsed as PersistedData).grades === "object"
        ) {
          resolve((parsed as PersistedData).grades);
        } else {
          reject(new Error("Invalid file format"));
        }
      } catch {
        reject(new Error("Could not parse the selected file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
