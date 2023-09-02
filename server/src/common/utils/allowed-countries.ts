import Stripe from 'stripe';

export const allowedCountries: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ['US', 'CA', 'GB', 'AU', 'SG', 'JP', 'VN'];
