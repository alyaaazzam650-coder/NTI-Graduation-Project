// get all quantity inputs
const quantities = document.querySelectorAll(".quantity");
const subtotalEls = document.querySelectorAll(".item-subtotal");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartTotal = document.querySelector("#cart-total");
const removeBtns = document.querySelectorAll(".remove");

function updateCart() {
  let subtotal = 0;

  quantities.forEach((input, index) => {
    const price = parseInt(input.dataset.price);
    const qty = parseInt(input.value);
    const itemSubtotal = price * qty;

    subtotalEls[index].innerText = `$${itemSubtotal}`;
    subtotal += itemSubtotal;
  });

  cartSubtotal.innerText = `$${subtotal}`;
  cartTotal.innerText = `$${subtotal}`;
}

// change quantity
quantities.forEach(input => {
  input.addEventListener("change", updateCart);
});

// remove item
removeBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    this.closest(".cart-item").remove();
    updateCart();
  });
});
// =======================
// Get Cart From LocalStorage
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// Elements
// =======================
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// =======================
// Render Cart
// =======================
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="text-center text-muted">Your cart is empty</p>
    `;
    totalPriceEl.innerText = "$0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="d-flex align-items-center justify-content-between border-bottom py-3">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" width="60">
          <div>
            <h6 class="mb-1">${item.name}</h6>
            <p class="mb-0 text-danger">$${item.price}</p>
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  totalPriceEl.innerText = `$${total}`;
}

// =======================
// Quantity
// =======================
function changeQty(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// =======================
// Remove Item
// =======================
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// =======================
// Init
// =======================
renderCart();


updateCart();


