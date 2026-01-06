const cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const productEl = e.target.closest('.product');
    const name = productEl.querySelector('h2').textContent;
    const price = Number(productEl.dataset.price);

    const existing = cart.find(item => item.name === name);
    if(existing) existing.quantity += 1;
    else cart.push({name, price, quantity:1});

    updateCart();
  });
});

clearCartBtn.addEventListener('click', () => {
  cart.length = 0;
  updateCart();
});

checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0){ alert("Sepetiniz boş!"); return; }

  let message = "Siparişiniz alındı!\n\n";
  let totalPrice = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    message += `${item.name} x${item.quantity} - ₺${itemTotal}\n`;
  });
  message += `\nToplam: ₺${totalPrice}`;
  alert(message);

  cart.length = 0;
  updateCart();
});

function updateCart(){
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - ₺${item.price * item.quantity}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });
  cartCount.textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
  totalEl.textContent = total;
}
