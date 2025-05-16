declare module '*.svg' {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   * 
   * This allows importing SVGs as both React components
   * and URL strings depending on the setup.
   */
  import * as React from 'react';

  // If you're using SVGR to import SVGs as React components
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const content: string; // fallback to string import

  export default content;
}