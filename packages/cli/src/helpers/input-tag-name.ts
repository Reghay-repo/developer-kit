import {input} from "@inquirer/prompts"


export const selectedTagName = async () =>
 input({
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