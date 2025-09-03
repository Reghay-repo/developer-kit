export const getIndexTemplate = (tagName: string) => `
export * from './${tagName}';
`;