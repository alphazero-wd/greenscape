import axios from "axios";

export const paginateProducts = async (
  query = "",
  slug = ""
): Promise<number> => {
  try {
    const {
      data: { count },
    } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        "/products/store/paginate" +
        (slug ? "/category/" + slug : slug) +
        query
    );
    return count as number;
  } catch (error) {
    return 0;
  }
};
