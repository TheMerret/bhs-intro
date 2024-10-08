export default function all<T>(promises: Promise<T>[]): Promise<Awaited<T>[]> {
  return new Promise((res, rej) => {
    const out: Awaited<T>[] = [];
    let doneCnt = 0;
    promises.forEach((p, ind) =>
      Promise.resolve(p)
        .then((val) => {
          out[ind] = val;
          doneCnt++;
          if (doneCnt == promises.length) {
            res(out);
          }
        })
        .catch((err) => rej(err))
    );
  });
}
