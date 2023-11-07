import { create } from "zustand";
import { z } from "zod";
type Statuses = "init" | "started" | "completed";

interface PaniniStore {
  paniniStatus: Statuses;
  errors: z.ZodIssue[];
  setPaniniStatus: (value: Statuses) => void;
  setErrors: (value: z.ZodIssue[] | []) => void;
}

const usePaniniStore = create<PaniniStore>((set) => ({
  paniniStatus: "init",
  errors: [],
  setPaniniStatus: (value) => set({ paniniStatus: value }),
  setErrors: (value) => set({ errors: value }),
}));

export default usePaniniStore;
