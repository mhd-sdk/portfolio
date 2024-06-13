export const darkTheme = {
  'color-scheme': 'dark',
  primary: '#373737',
  secondary: '#373737',
  accent: '#373737',
  'base-100': '#000000',
  'base-200': '#141414',
  'base-300': '#262626',
  'base-content': '#d6d6d6',
  neutral: '#373737',
  info: '#0000ff',
  success: '#008000',
  warning: '#ffff00',
  error: '#ff0000',
  '--rounded-box': '0',
  '--rounded-btn': '0',
  '--rounded-badge': '0',
  '--animation-btn': '0',
  '--animation-input': '0',
  '--btn-focus-scale': '1',
  '--tab-radius': '0',
}

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
}

export function hexToRgb(hex: string): string {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the hexadecimal string
  const bigint = parseInt(hex, 16)

  // Split it into red, green, and blue components
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  // Return the RGB color string
  return `${r}, ${g}, ${b}`
}
