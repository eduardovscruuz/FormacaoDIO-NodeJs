import { createItem } from './services/item.mjs';
import * as cartService from './services/cart.mjs';

export const myCart = [];
export const myWishlist = [];

console.log('Welcome to your Shopee Cart! 🛒 (Made with Node.Js)\n');

//Criando os itens disponíveis
const item1 = await createItem('Hotwheels Ferrari', 20.99, 1);
const item2 = await createItem('Hotwheels Land-Rover', 24.99, 3);
const item3 = await createItem('Hotwheels Porsche', 31.8, 2);
const item4 = await createItem('Prateleira p/ Hotwheels', 89.9, 2);
const item5 = await createItem('Sabão de limpeza p/ Hotwheels', 12.5, 4);

//Adicionando no carrinho
await cartService.addItem(myCart, item1);
await cartService.addItem(myCart, item2);
await cartService.addItem(myCart, item3);

//Adicionando na wishlist
await cartService.addItem(myWishlist, item4);
await cartService.addItem(myWishlist, item5);

//Mostrando ambas as listas
await cartService.display(myWishlist);
await cartService.calculateTotal(myWishlist);
console.log('');
await cartService.display(myCart);
await cartService.calculateTotal(myCart);

console.log('\n----------- REALIZANDO ALTERAÇÕES NAS LISTAS... -----------\n');
await cartService.removeItem(myWishlist, item4);
await cartService.deleteItem(myCart, item1.name);
await cartService.removeItem(myCart, item2);

//Mostrando ambas as listas ALTERADAS
await cartService.display(myWishlist);
await cartService.calculateTotal(myWishlist);
console.log('');
await cartService.display(myCart);
await cartService.calculateTotal(myCart);
