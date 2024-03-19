export const formatPrice = (price: number) => {
  const [int, decimal] = price.toString().split(".");
  return (
    "$" +
    int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (decimal ? "." + decimal.slice(0, 2) : "")
  );
};
