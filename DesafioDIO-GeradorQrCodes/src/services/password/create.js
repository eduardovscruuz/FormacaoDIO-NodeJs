import { handle } from './handle.js';
import chalk from 'chalk';

export async function createPassword() {
  console.log(chalk.green('password'));
  const password = await handle();
  console.log(password);
}
