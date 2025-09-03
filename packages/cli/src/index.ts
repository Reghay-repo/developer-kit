
import { select } from '@inquirer/prompts';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { toPascalCase } from "./helpers/to-pascale";
import { generateDocs } from "./helpers/generate-docs";
import { getReactWrapperTemplate, getVueWrapperTemplate } from './helpers/get-wrapper-templates';
import { getIndexTemplate } from "./helpers/get-index-template";
import { withAiDocs } from "./helpers/with-ai-docs";
import { selectedTagName } from "./helpers/input-tag-name";
import {getComponentTemplate} from "./helpers/get-component-template";

dotenv.config({ path: path.resolve(__dirname, '../.env') });



async function main() {
    console.log('⚡ Welcome to the C4 Component Generator! ⚡');

    const monorepoRoot = path.join(__dirname, '..', '..', '..');
    const componentsPackageJsonPath = path.join(monorepoRoot, 'packages', 'components', 'package.json');
    const packageJsonContent = await fs.readFile(componentsPackageJsonPath, 'utf-8');
    const { name: componentPackageName } = JSON.parse(packageJsonContent);

    if (!componentPackageName) {
        throw new Error('Could not find "name" in packages/components/package.json');
    }
    console.log(`✅ Detected component package name: ${componentPackageName}`);

    const tagName = await selectedTagName();
    const wrapperType = await select({
        message: 'Generate a framework-specific wrapper? (Optional)',
        choices: [
            { name: 'None (Web Component only)', value: 'none' },
            { name: 'React (.tsx)', value: 'react' },
            { name: 'Vue (.vue)', value: 'vue' },
        ]
    });
    const isAiDocsSelected = await withAiDocs();


    const className = toPascalCase(tagName);
    let aiDocsContent: string | undefined = '';

    if (isAiDocsSelected) {
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️ WARNING: GEMINI_API_KEY not found. Skipping AI documentation.');
        } else {
            aiDocsContent = await generateDocs(className, tagName);
        }
    }


    const componentDir = path.join(monorepoRoot, 'packages', 'components', 'src', tagName);

    try {
        await fs.mkdir(componentDir);

        const writePromises: Promise<void>[] = [
            fs.writeFile(
                path.join(componentDir, `${tagName}.ts`),
                getComponentTemplate(className, tagName, aiDocsContent)
            ),
            fs.writeFile(
                path.join(componentDir, `index.ts`),
                getIndexTemplate(tagName)
            ),
        ];

        if (wrapperType === 'react') {
            const wrapperContent = getReactWrapperTemplate(className, tagName, componentPackageName);
            writePromises.push(fs.writeFile(path.join(componentDir, `${className}.tsx`), wrapperContent));
        } else if (wrapperType === 'vue') {
            const wrapperContent = getVueWrapperTemplate(className, tagName, componentPackageName);
            writePromises.push(fs.writeFile(path.join(componentDir, `${className}.vue`), wrapperContent));
        }

        await Promise.all(writePromises);

        const mainIndexPath = path.join(monorepoRoot, 'packages', 'components', 'src', 'index.ts');
        await fs.appendFile(mainIndexPath, `\nexport * from './${tagName}';`);

        console.log(`\n✅ Success! Created ${className} at 'packages/components/src/${tagName}'`);
        if (wrapperType !== 'none') {
            console.log(`📄 ${wrapperType.charAt(0).toUpperCase() + wrapperType.slice(1)} wrapper component was also created.`);
        }
        if (aiDocsContent) {
            console.log('🤖 AI documentation was successfully added.');
        }

    } catch (error) {
        console.error('❌ Oh no! An error occurred during file operations:', error);
    }
}

main().catch(error => {
    console.error('A fatal error occurred:', error.message);
    process.exit(1);
});