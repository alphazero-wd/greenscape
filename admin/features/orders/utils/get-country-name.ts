import { getName, overwrite } from "country-list";

export const getCountryName = (code: string) => {
  overwrite([
    {
      code: "GB",
      name: "United Kingdom",
    },
    { code: "US", name: "United States" },
  ]);

  return getName(code);
};
