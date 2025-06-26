export const navigateWithDelay = (to: string) => {
  setTimeout(() => {
    window.location.href = to;
  }, 2000);
};
