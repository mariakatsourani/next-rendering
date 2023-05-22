export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("resolve");
      resolve(true);
    }, time);
  });
}
