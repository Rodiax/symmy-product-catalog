export function calculatePriceWithDiscount(
  price: number,
  discountPercentage: number
) {
  const discount = (discountPercentage / 100) * price;

  return (price - discount).toFixed(2);
}
