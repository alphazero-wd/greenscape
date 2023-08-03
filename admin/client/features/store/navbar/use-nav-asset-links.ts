import { useMemo } from "react";

export const useNavAssetLinks = () => {
  return useMemo(
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
        title: "Brands",
        href: "/brands",
        description: "For customers who want designer labels",
      },
      {
        title: "Billboards",
        href: "/billboards",
        description: "Images carousel displayed on the home page with slogans",
      },
    ],
    [],
  );
};
