//import { connectToDatabase } from './utils/database.mjs';
//import { connectToDatabase, disconnectToDatabase } from './utils/database.mjs';
import * as database from './utils/database.mjs';
//import { getDataFromApi, key } from './utils/api.mjs';
import * as api from './utils/api.mjs';

database.connectToDatabase('my-database\n');
console.log(`${database.databaseType.userType} says:`);
api.getDataFromApi();
console.log('Hello, ECMA\n');
database.disconnectToDatabase('my-database');
