import { allowedCharacters } from './utils/allowedCharacters';

export async function handle() {
  let characters = [];
  let password = '';

  const passwordLength = process.env.PASSWORD_LENGTH;
  characters = await allowedCharacters();

  for (let i = 0; i < passwordLength; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }
  return password;
}
