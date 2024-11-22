export async function connectToDatabse(user, password) {
  if (user === process.env.USERDATABASE && password === process.env.PASSWORDDATABASE) {
    console.log('Login efetuado, conexão com banco de dados estabelecida');
  } else {
    console.log('Falha de login, não foi possível a conexão com banco de dados');
  }
}
