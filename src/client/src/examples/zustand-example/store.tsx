import { create } from "zustand";
// import { devtools } from "zustand/middleware";

type CounterState = {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
  resetCount: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increaseCount: function () {
    set((state: CounterState) => ({
      count: state.count + 1,
    }));
  },
  decreaseCount: function () {
    set((state: CounterState) => ({
      count: state.count - 1,
    }));
  },
  resetCount: function () {
    set(() => ({
      count: 0,
    }));
  },
}));
