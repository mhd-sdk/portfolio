import * as React from 'react';
interface ISvgComponentProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}
export const Sun = (props: ISvgComponentProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M13 3h-2v2h2V3zm4 2h2v2h-2V5zm-6 6h2v2h-2v-2zm-8 0h2v2H3v-2zm18 0h-2v2h2v-2zM5 5h2v2H5V5zm14 14h-2v-2h2v2zm-8 2h2v-2h-2v2zm-4-2H5v-2h2v2zM9 7h6v2H9V7zm0 8H7V9h2v6zm0 0v2h6v-2h2V9h-2v6H9z"
    />
  </svg>
);
