import { FC } from "react";

function debounce<T>(
  func: (...args: T[]) => void,
  delay: number
): (...args: T[]) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function inner(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export const DebounceInput: FC = function () {
  function inputCallback(value: string) {
    console.log(value);
  }
  return (
    <input
      type="text"
      onChange={debounce((e) => inputCallback(e.target.value), 800)}
    />
  );
};
