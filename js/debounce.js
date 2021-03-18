const DEBOUNCE_INTERVAL = 500;

const debounce = (func, wait, immediate) => {
  let timeout;

  return () => {
    const context = this;
    //const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context);
  };
};

export { DEBOUNCE_INTERVAL, debounce }
