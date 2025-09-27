function openMenu(evt, menuName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(menuName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-red";
}
document.getElementById("myLink").click();

// Carrinho
let cart = {};

function addToCart(item, price) {
  if(cart[item]) cart[item].quantity += 1;
  else cart[item] = {price: price, quantity: 1};
  updateCartUI();
}

function removeFromCart(item, price) {
  if(cart[item]) {
    cart[item].quantity -= 1;
    if(cart[item].quantity <= 0) delete cart[item];
  }
  updateCartUI();
}

function updateCartUI() {
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  let total = 0;
  let totalQty = 0;
  cartItemsContainer.innerHTML = "";

  for(const [name, data] of Object.entries(cart)) {
    total += data.price * data.quantity;
    totalQty += data.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.textContent = `${name} x${data.quantity} - R$${data.price*data.quantity}`;
    cartItemsContainer.appendChild(div);
  }

  document.getElementById("cart-total").textContent = total;
  cartCount.textContent = totalQty;

  if(totalQty > 0) {
    cartIcon.classList.add("bounce");
    setTimeout(()=>{cartIcon.classList.remove("bounce");}, 500);
  }
}

// abrir/fechar modal
function toggleCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

let cartCount = 0;

function addToCart(item, price) {
  cartCount++;
  const cartIcon = document.getElementById('floating-cart');
  const cartCounter = document.getElementById('cart-count');
  cartCounter.textContent = cartCount;

  // Animação rápida de “pulso”
  cartIcon.classList.add('animate');
  setTimeout(() => cartIcon.classList.remove('animate'), 300);
}
