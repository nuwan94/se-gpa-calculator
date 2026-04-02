import { create } from "zustand";
import type { GradeName, GradesMap } from "../types";
import { loadGrades, saveGrades, clearGrades } from "../lib/storage";

interface CalculatorState {
  grades: GradesMap;
  setGrade: (subjectId: string, grade: GradeName | undefined) => void;
  importGrades: (grades: GradesMap) => void;
  reset: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  grades: loadGrades(),

  setGrade: (subjectId, grade) =>
    set((state) => {
      const next = { ...state.grades };
      if (grade === undefined) {
        delete next[subjectId];
      } else {
        next[subjectId] = grade;
      }
      saveGrades(next);
      return { grades: next };
    }),

  importGrades: (grades) => {
    saveGrades(grades);
    set({ grades });
  },

  reset: () => {
    clearGrades();
    set({ grades: {} });
  },
}));
