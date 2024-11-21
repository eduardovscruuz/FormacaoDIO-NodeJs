const databaseType = {
  userType: 'Admin',
  typeData: 'datalocal',
};

async function connectToDatabase(dataName) {
  //lógica de conexão
  console.log(`...Conectando ao banco ${dataName}`);
}

async function disconnectToDatabase(dataName) {
  //lógica de conexão
  console.log(`Desconectando do banco ${dataName}...`);
}

export { connectToDatabase, disconnectToDatabase, databaseType };
