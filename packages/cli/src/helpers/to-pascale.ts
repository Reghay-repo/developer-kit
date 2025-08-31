export function toPascalCase(str: string): string {
  return str
    .replace(/^c4-/, '') // Remove the 'c4-' prefix
    .replace(/-(\w)/g, (_, c) => c.toUpperCase()) // Convert kebab-case to camelCase
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
}