import { create } from "zustand";
import { z } from "zod";
type Statuses = "init" | "started" | "completed";

interface PaniniStore {
  paniniStatus: Statuses;
  errors: z.ZodIssue[] | null;
  setPaniniStatus: (value: Statuses) => void;
  setErrors: (value: z.ZodIssue[] | null) => void;
}

const usePaniniStore = create<PaniniStore>((set) => ({
  paniniStatus: "init",
  errors: null,
  setPaniniStatus: (value) => set({ paniniStatus: value }),
  setErrors: (value) => set({ errors: value }),
}));

export default usePaniniStore;
