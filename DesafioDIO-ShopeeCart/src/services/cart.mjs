import { myCart, myWishlist } from '../index.js';

//Quais ações meu carrinho pode fazer:

//CASOS DE USO:

//Adicionar item no carrinho
export async function addItem(userCart, item) {
  userCart.push(item);
}

//Deletar item do carrinho
export async function deleteItem(userCart, name) {
  const index = userCart.findIndex(item => item.name === name);

  if (index !== -1) {
    userCart.splice(index, 1);
  }
}

//Remover item
export async function removeItem(userCart, item) {
  //Encontrando índice do item
  const indexFound = userCart.findIndex(p => p.name === item.name);

  if (indexFound == -1) {
    console.log('Item não encontrado');
    return;
  }
  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity--;
    return;
  }
  if (userCart[indexFound].quantity == 1) {
    userCart.splice(indexFound, 1);
    return;
  }
}

//Calcular item
export async function calculateTotal(userCart) {
  const result = await userCart.reduce((total, item) => total + item.subtotal(), 0);
  console.log(`\nTOTAL: R$${result}`);
}

export async function display(userCart) {
  if (userCart === myCart) {
    console.log('Shopee Cart:');
    userCart.forEach((item, index) => {
      console.log(`${index + 1} - ${item.name}: ${item.price} | ${item.quantity}un | Subtotal = ${item.subtotal()}`);
    });
  } else if (userCart === myWishlist) {
    console.log('Wishlist:');
    userCart.forEach((item, index) => {
      console.log(`${index + 1} - ${item.name}: ${item.price} | ${item.quantity}un | Subtotal = ${item.subtotal()}`);
    });
  }
}
