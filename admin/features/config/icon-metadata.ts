import { Metadata } from "next";
export const iconMetadata: Metadata["icons"] = {
  icon: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/icons/favicon-light.ico",
      href: "/icons/favicon-light.ico",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/icons/favicon-dark.ico",
      href: "/icons/favicon-dark.ico",
    },
  ],
};
