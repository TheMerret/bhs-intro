import { expect, test, vi } from "vitest";
import all from ".";

test("promises all", () => {
  const consoleMock = vi.spyOn(console, "log");

  const pr1 = new Promise((res, rej) => setTimeout(() => res(1), 100));
  const pr2 = new Promise((res, rej) => setTimeout(() => res(2), 200));
  const pr3 = new Promise((res, rej) => setTimeout(() => res(3), 500));
  const pr4rejected = new Promise((res, rej) =>
    setTimeout(() => rej("reject"), 300)
  );

  Promise.resolve(
    all([pr1, pr2, pr3])
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  ).then(() => {
    expect(consoleMock).toHaveBeenCalledWith("[1, 2, 3]");
  }); // вывод: [1, 2, 3]
  Promise.resolve(
    all([pr1, pr2, pr4rejected])
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  ).then(() => {
    expect(consoleMock).toHaveBeenLastCalledWith("reject");
  }); // вывод: reject
});
