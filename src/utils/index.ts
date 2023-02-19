export function debounce(fn: (...args: unknown[]) => void) {
  let raf = 0;

  return (...args: unknown[]) => {
    if (raf) {
      return;
    }

    raf = window.requestAnimationFrame(() => {
      fn(...args); // run useful code
      raf = 0;
    });
  };
}