const products = require('./services/products');
const config = require('./services/config');

async function main() {
  console.log('Carrinho de compras:\n');
  products.getFullName(434, 'Mousepad');
  products.getFullName(422, 'Teclado');
  console.log(config.production);
}

main();
