import {confirm} from '@inquirer/prompts';

export const withAiDocs = async () => {
   return confirm({
       message: 'Generate AI-powered documentation for this component? (PoC Feature)',
       default: true,
   });
}