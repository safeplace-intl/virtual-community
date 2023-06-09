import { useCounterStore } from "@examples/zustand-example";

export default function Counter() {
  const { count, increaseCount } = useCounterStore();

  // console.log(count, increaseCount);

  return (
    <div className="flex">
      <div className="mx-auto my-auto">Count is {count} </div>
      <div
        className="mx-auto my-auto border border-2 border-red-500"
        onClick={increaseCount}
      >
        Increase Count
      </div>
    </div>
  );
}
