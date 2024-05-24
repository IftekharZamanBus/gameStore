function addDecimal(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

function priceCalculation(orderItems, coupon, discount, tax) {
  // Calculate the subtotal by summing the prices of all the games in the order
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate the discount amount by applying the coupon code
  const couponDiscount = coupon ? parseFloat(coupon.discount) : 0;
  const discountAmount = discount ? parseFloat(discount) : 0;
  let taxAmount = tax ? parseFloat(tax.rate) : 0;

  // Calculate the grand total by subtracting the discount amount from the subtotal
  let grandTotal = subtotal - (couponDiscount + discountAmount);
  const taxTotal = grandTotal * (taxAmount / 100);
  grandTotal += taxTotal;

  console.log(subtotal);
  console.log(couponDiscount);
  console.log(discountAmount);
  console.log(taxAmount);
  console.log(grandTotal);

  // Return the calculated values
  return {
    subtotal: addDecimal(subtotal),
    totalDiscount: addDecimal(couponDiscount + discountAmount),
    grandTotal: addDecimal(grandTotal),
  };
}

module.exports = { priceCalculation };
