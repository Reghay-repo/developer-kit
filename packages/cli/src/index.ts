import {input, confirm} from '@inquirer/prompts';
import path from 'path';
import fs from 'fs/promises';
import {toPascalCase} from "./helpers/to-pascale";
import {generateDocs} from "./helpers/generate-docs";

import dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, '../.env')});
const getComponentTemplate = (className: string, tagName: string, aiDocs: string = '') => `
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';




${aiDocs ? `\n${aiDocs}` : ''}
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

async function main() {



    const withAiDocs = await confirm({
        message: 'Generate AI-powered documentation for this component? (PoC Feature)',
        default: true,
    });
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

    let aiDocsContent: string | undefined = '';
    const className = toPascalCase(tagName);

    if (withAiDocs) {
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️ WARNING: GEMINI_API_KEY not found ' +
                'in .env file. Skipping AI documentation.');
        } else {
            aiDocsContent = await generateDocs(className, tagName,);
        }
    }


    const monorepoRoot = path.join(__dirname, '..', '..', '..');
    const componentDir = path.join(
        monorepoRoot,
        'packages',
        'components',
        'src',
        tagName
    );

    try {
        await fs.mkdir(componentDir);

        await Promise.all([
            fs.writeFile(
                path.join(componentDir, `${tagName}.ts`),
                getComponentTemplate(className, tagName, aiDocsContent)
            ),
            fs.writeFile(
                path.join(componentDir, `index.ts`),
                getIndexTemplate(tagName)
            ),
        ]);

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

void main();