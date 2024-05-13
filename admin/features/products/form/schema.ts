import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name must be between 1 and 120 characters" })
    .max(120, { message: "Product name must be between 1 and 120 characters" }),

  desc: z.string().nonempty({ message: "Please provide a description" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .gte(0.01, { message: "Price cannot be less than 0.01" })
    .multipleOf(0.01, { message: "Price needs to have 2 decimal digits" }),
  inStock: z.coerce
    .number()
    .nonnegative({
      message: "The number of products in stock must be non-negative",
    })
    .int(),
  categoryIds: z.number().int().gte(1).array(),
  status: z.enum(["Active", "Draft", "Archived"]),
});
