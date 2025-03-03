export const navigateWithDelay = (to: string) => {
  setTimeout(() => {
    window.location.href = to;
  }, 1000);
};
