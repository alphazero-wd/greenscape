import { useMemo } from "react";

export const useNavCatalogLinks = () => {
  const catalogLinks = useMemo(
    () => [
      {
        title: "Categories",
        href: "/categories",
        description: "Classify products for better filtering results",
      },
      {
        title: "Sizes",
        href: "/sizes",
        description: "Allow customers to select the products that fit them",
      },
      {
        title: "Colors",
        href: "/colors",
        description:
          "Allow customers to select the products that match their styles and preferences",
      },
      {
        title: "Billboards",
        href: "/billboards",
        description:
          "Images carousel displayed on the home page for each store",
      },
    ],
    [],
  );
  return catalogLinks;
};
