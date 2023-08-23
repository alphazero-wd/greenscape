export interface CreateVariantDto {
  colorId?: number;
  sizeId?: number;
  price: number;
  inStock: number;
}

export const groupVariants = (variants: CreateVariantDto[]) => {
  return variants.reduce(
    (acc: Record<number, CreateVariantDto[]>, { colorId = 0, ...cur }) => {
      if (!(colorId in acc)) acc[colorId] = [];
      acc[colorId].push(cur);
      return acc;
    },
    Object.create(null),
  );
};
