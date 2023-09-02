import Stripe from 'stripe';

export const getShippingOption = (subtotal: number, total: number) => {
  return shippingOptions.find(
    (option) =>
      option.shipping_rate_data.fixed_amount.amount === total - subtotal,
  ).shipping_rate_data.display_name!;
};

export const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
  [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 0,
          currency: 'usd',
        },
        display_name: 'Free shipping',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 5,
          },
          maximum: {
            unit: 'business_day',
            value: 7,
          },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 1500,
          currency: 'usd',
        },
        display_name: 'Next day air',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 1,
          },
          maximum: {
            unit: 'business_day',
            value: 2,
          },
        },
      },
    },
  ];
