import { input } from '@inquirer/prompts';
import path from 'path';
import fs from 'fs/promises';
import {toPascalCase} from "./helpers/to-pascale";



// --- Template definitions (no changes here) ---
const getComponentTemplate = (className: string, tagName: string) => `
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('${tagName}')
export class ${className} extends LitElement {
  static styles = css\`
    :host {
      display: block;
    }
  \`;

  render() {
    return html\`
      <div>Hello from ${className}!</div>
    \`;
  }
}
`;

const getIndexTemplate = (tagName: string) => `
export * from './${tagName}';
`;

// --- Main script logic (updated) ---
async function main() {
  console.log('⚡ Welcome to the C4 Component Generator! ⚡');

  const tagName = await input({
    message: 'What is the tag name of the new component? (e.g., c4-alert)',
    validate: (value: string) => {
      if (!value.startsWith('c4-')) {
        return 'Component name must start with "c4-"';
      }
      if (/[^a-z0-9-]/.test(value)) {
        return 'Component name can only contain lowercase letters, numbers, and hyphens.';
      }
      return true;
    },
  });

  const className = toPascalCase(tagName);


  const monorepoRoot = path.join(__dirname, '..', '..', '..');
  const componentDir = path.join(
    monorepoRoot,
    'packages',
    'components',
    'src',
    tagName
  );

  try {
    // 1. Create the component directory
    await fs.mkdir(componentDir);

    // 2. Create the files
    await Promise.all([
      fs.writeFile(
        path.join(componentDir, `${tagName}.ts`),
        getComponentTemplate(className, tagName)
      ),
      fs.writeFile(
        path.join(componentDir, `index.ts`),
        getIndexTemplate(tagName)
      ),
    ]);

    // 3. Update the main index.ts
    const mainIndexPath = path.join(
      monorepoRoot,
      'packages',
      'components',
      'src',
      'index.ts'
    );
    await fs.appendFile(mainIndexPath, `\nexport * from './${tagName}';`);

    console.log(`\n✅ Success! Created ${className} at 'packages/components/src/${tagName}'`);
    console.log('Updated the main library entry point to include your new component.');

  } catch (error) {
    console.error('❌ Oh no! An error occurred:', error);
  }
}

// Run the main function
main();