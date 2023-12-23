export const darkTheme = {
  'color-scheme': 'dark',
  primary: '#9FE88D',
  secondary: '#FF7D5C',
  accent: '#C792E9',
  neutral: '#1c212b',
  'neutral-content': '#B2CCD6',
  'base-100': '#2A303C',
  'base-200': '#242933',
  'base-300': '#20252E',
  'base-content': '#B2CCD6',
  info: '#28ebff',
  success: '#62efbd',
  warning: '#efd057',
  error: '#ffae9b'
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
  'base-content': '#1f2937'
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
