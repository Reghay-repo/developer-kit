import {GoogleGenAI} from '@google/genai';

async function generateDocs(className: string, tagName: string): Promise<string | undefined> {
    console.log('\n🤖 Calling the AI to generate documentation...');
    const API_KEY = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({apiKey: API_KEY});

    const prompt = `
    You are a senior front-end developer and an expert technical writer.
    Your task is to generate a professional JSDoc comment block for a new Lit-based Web Component.

    The component's class name is: ${className}
    The component's HTML tag name is: ${tagName}

    Generate a JSDoc block that includes:
    1. A concise, one-line summary of the component's likely purpose.
    2. A blank line.
    3. The @element tag with the correct tag name.
    4. Suggestions for two common @slot entries (like a default slot or a named slot).
    5. Suggestions for two common @cssprop theming variables.

    The output must be ONLY the JSDoc comment block, starting with /** and ending with */.
    
    **IMPORTANT RULES:**
    - Your response MUST be raw text ONLY.
    - Your response MUST start directly with /** and end with */.
    - DO NOT wrap the output in Markdown code blocks like \`\`\`javascript ... \`\`\`.
  `;

    try {
        const result = await ai.models.generateContent({model: 'gemini-2.5-pro', contents: prompt});
        const text = result.text;
        console.log('✅ AI documentation generated successfully!');
        return text;
    } catch (error) {
        console.error('❌ Error calling the AI API:', error);
        return '/**\n * An error occurred during AI doc generation.\n */';
    }
}

export {generateDocs};
