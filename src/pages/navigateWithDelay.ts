export const navigateWithDelay = (to: string): void => {
  setTimeout(() => {
    window.location.href = to
  }, 1000);
};
