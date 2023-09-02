export const getShippingOption = (shippingCost: number) => {
  switch (shippingCost) {
    case 0:
      return "Free shipping (5-7 business days)";
    case 15:
      return "Next day air (1-2 business days)";
    default:
      return "Shipping option not found";
  }
};
