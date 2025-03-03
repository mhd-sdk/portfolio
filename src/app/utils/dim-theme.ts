export const darkTheme = {
  'color-scheme': 'dark',
  primary: '#38bdf8',
  secondary: '#818CF8',
  accent: '#F471B5',
  neutral: '#1E293B',
  'base-100': '#0F172A',
  'base-200': '#1E293B',
  'base-300': '#334155',
  info: '#0CA5E9',
  'info-content': '#000000',
  success: '#2DD4BF',
  warning: '#F4BF50',
  error: '#FB7085',
};

export const lightTheme = {
  'color-scheme': 'light',
  primary: 'oklch(49.12% 0.3096 275.75)',
  secondary: 'oklch(69.71% 0.329 342.55)',
  'secondary-content': 'oklch(98.71% 0.0106 342.55)',
  accent: 'oklch(76.76% 0.184 183.61)',
  neutral: '#2B3440',
  'neutral-content': '#D7DDE4',
  'base-100': 'oklch(100% 0 0)',
  'base-200': '#F2F2F2',
  'base-300': '#E5E6E6',
  'base-content': '#1f2937',
};

export function hexToRgb(hex: string): string {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the hexadecimal string
  const bigint = parseInt(hex, 16);

  // Split it into red, green, and blue components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB color string
  return `${r}, ${g}, ${b}`;
}
