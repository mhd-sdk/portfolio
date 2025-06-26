import type { MDXComponents } from 'mdx/types';
import { JSX } from 'react';

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element {
  return <a {...props} style={{ textDecoration: 'underline' }} target="_blank" className="my-custom-link" />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
    ...components,
  };
}
