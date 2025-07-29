import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

import React from "react";

const themeComponents = getThemeComponents();



export function useMDXComponents(components: any) {
  return {
    ...themeComponents,
    ...components,
  };
}