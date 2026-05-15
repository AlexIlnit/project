import { create } from "zustand";

type State = {
  subjects: string[];
  interests: string[];
  answers: string[];
  city: string; // 🔥 добавили

  toggleSubject: (s: string) => void;
  toggleInterest: (i: string) => void;
  setAnswers: (a: string[]) => void;
  setCity: (c: string) => void; // 🔥 добавили
};

export const useStore = create<State>()((set, get) => ({
  subjects: [],
  interests: [],
  answers: [],
  city: "", // 🔥 начальное значение

  toggleSubject: (s) => {
    const subjects = get().subjects;

    set({
      subjects: subjects.includes(s)
        ? subjects.filter(x => x !== s)
        : [...subjects, s]
    });
  },

  toggleInterest: (i) => {
    const interests = get().interests;

    set({
      interests: interests.includes(i)
        ? interests.filter(x => x !== i)
        : [...interests, i]
    });
  },

  setAnswers: (a) => set({ answers: a }),

  // 🔥 новый метод
  setCity: (c) => set({ city: c })
}));