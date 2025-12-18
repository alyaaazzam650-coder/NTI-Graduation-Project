// =======================
// Cart Local Storage
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد الكارت
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

// إضافة منتج للكارت
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// =======================
// Add To Cart Buttons
// =======================
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function () {

    const product = {
      name: this.dataset.name,
      price: Number(this.dataset.price),
      image: this.dataset.image,
      quantity: 1
    };

    addToCart(product);
    alert("Product added to cart 🛒");
  });
});

// =======================
// Move All To Cart
// =======================
const moveAllBtn = document.getElementById("moveAllToCart");

if (moveAllBtn) {
  moveAllBtn.addEventListener("click", function () {

    document.querySelectorAll(".add-to-cart").forEach(button => {
      const product = {
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image,
        quantity: 1
      };
      cart.push(product);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("All products moved to cart 🛒");
  });
}

// =======================
// Init
// =======================
updateCartCount();
