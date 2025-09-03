import { input, confirm, select } from '@inquirer/prompts';

export interface UserInputs {
  tagName: string;
  wrapperType: 'none' | 'react' | 'vue';
  withAiDocs: boolean;
}