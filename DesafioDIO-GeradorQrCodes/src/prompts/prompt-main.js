import chalk from 'chalk';

export const mainPrompt = [
  {
    name: 'select',
    description: chalk.yellow.bold('Escolha a ferramenta (1:QR-CODE ou 2:PASSWORD)'),
    pattern: /^[1-2]$/,
    message: chalk.red.italic('Escolha apenas entre 1 e 2'),
    required: true,
  },
];
