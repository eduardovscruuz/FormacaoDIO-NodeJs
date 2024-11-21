//Quais ações um item pode fazer:

//CASOS DE USO:

//Criar item com subtotal certo
export async function createItem(name, price, quantity) {
  return {
    name,
    price,
    quantity,
    subtotal() {
      return this.price * this.quantity;
    },
  };
}
