import { connectToDatabse } from './database.mjs';

async function main() {
  await connectToDatabse(process.env.USERDATABASE, process.env.PASSWORDDATABASE);
}
main();
