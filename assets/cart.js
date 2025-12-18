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

updateCart();
