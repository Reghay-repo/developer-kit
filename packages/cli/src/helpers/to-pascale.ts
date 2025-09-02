export function toPascalCase(str: string): string {
  return str
    .replace(/^c4-/, '')
    .replace(/-(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
}