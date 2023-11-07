import { create } from "zustand";
import { z } from "zod";
type Statuses = "init" | "started" | "completed";

interface PaniniStore {
  paniniStatus: Statuses;
  errors: z.ZodIssue[];
  reset: boolean;
  setPaniniStatus: (value: Statuses) => void;
  setErrors: (value: z.ZodIssue[] | []) => void;
  setReset: () => void;
}

const usePaniniStore = create<PaniniStore>((set) => ({
  paniniStatus: "init",
  errors: [],
  reset: false,
  setPaniniStatus: (value) => set({ paniniStatus: value }),
  setErrors: (value) => set({ errors: value }),
  setReset: () => set((state) => ({reset: !state.reset}))
}));

export default usePaniniStore;
