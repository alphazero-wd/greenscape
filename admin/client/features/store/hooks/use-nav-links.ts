import { useMemo } from "react";

export const useNavLinks = () => {
  const links = useMemo(
    () => [
      {
        name: "Overview",
        href: "",
      },
      { name: "Products", href: "/products" },
      {
        name: "Orders",
        href: "/orders",
      },
      { name: "Settings", href: "/settings" },
    ],
    []
  );
  return links;
};
