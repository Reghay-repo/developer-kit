

const getReactWrapperTemplate = (className:string,tagName:string,componentPackageName:string) =>
    `
    import React, { useRef, useEffect, HTMLAttributes } from 'react';
    import type { ${className} } from '${componentPackageName}';
    type Props = HTMLAttributes<HTMLElement> & Partial<Omit<${className}, keyof HTMLElement>>;
    export const ${className}Component: React.FC<Props> = ({ children, ...props }) => {
  const ref = useRef<${className}>(null);

  useEffect(() => {
    const { current } = ref;
    if (current) {
      Object.entries(props).forEach(([key, value]) => {
        // A simple way to handle props. More complex logic might be needed for objects/arrays.
        (current as any)[key] = value;
      });
    }
  }, [props]);

  return React.createElement('${tagName}', { ref }, children);
};
    `;



const getVueWrapperTemplate =
    (className: string, tagName: 'c4-button' | 'c4-card' | string,componentPackageName:string) => `
<script setup lang="ts">
import type { ${className} } from '${componentPackageName}';

// This defines the props the Vue component will accept.
// It's a placeholder; a real implementation might need more specific types.
defineProps<Partial<Omit<${className}, keyof HTMLElement>>>();
</script>

<template>
  <${tagName} v-bind="$props">
    <slot />
  </${tagName}>
</template>
`;


export { getReactWrapperTemplate, getVueWrapperTemplate };