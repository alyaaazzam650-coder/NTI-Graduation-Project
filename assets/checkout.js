function applyCoupon() {
  const coupon = document.getElementById("coupon").value;
  let subtotal = 1750;

  if (coupon === "SAVE10") {
    subtotal -= 175;
    alert("Coupon Applied 🎉");
  } else {
    alert("Invalid Coupon ❌");
  }

  document.getElementById("subtotal").innerText = "$" + subtotal;
  document.getElementById("total").innerText = "$" + subtotal;
}
