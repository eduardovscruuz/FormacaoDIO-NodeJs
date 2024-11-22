export async function allowedCharacters() {
  let allowed = [];

  if (process.env.UPPERCASE_LETTERS) {
    allowed.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }
  if (process.env.LOWERCASE_LETTERS) {
    allowed.push(...'abcdefghijklmnopqrstuvwxyz');
  }
  if (process.env.NUMBERS) {
    allowed.push(...'0123456789');
  }
  if (process.env.SPECIAL_CHARACTERS) {
    allowed.push(...'~!@#$%^&*(){}[]-_=+');
  }
  return allowed;
}
