import { create } from "zustand";

type Statuses = "init" | "started" | "completed";

interface PaniniStore {
  paniniStatus: Statuses;
  setPaniniStatus: (value: Statuses) => void;
}

const usePaniniStore = create<PaniniStore>((set) => ({
  paniniStatus: "init",
  setPaniniStatus: (value) => set({ paniniStatus: value }),
}));

export default usePaniniStore;
