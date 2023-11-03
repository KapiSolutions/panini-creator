import { create } from "zustand";
import type { SandwichPayload } from "../types/types";

type Statuses = "init" | "started" | "completed";

interface PaniniStore {
  paniniStatus: Statuses;
  sandwichPayload: SandwichPayload;
  setPaniniStatus: (value: Statuses) => void;
}

const usePaniniStore = create<PaniniStore>((set) => ({
  paniniStatus: "init",
  sandwichPayload: {
    sandwichName: "",
    cutlery: false,
    napkins: false,
    base: {
      bread: "FULL GRAIN",
      cheese: ["EDAM"],
      meat: ["SALAMI"],
      dressing: ["OLIVE OIL"],
      vegetables: [],
    },
    extras: {
      egg: ["FRIED EGG"],
      spreads: [],
      serving: "WARM",
      topping: null,
    },
  },
  setPaniniStatus: (value) => set({ paniniStatus: value }),
}));

export default usePaniniStore;
