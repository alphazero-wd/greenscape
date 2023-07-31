import { getCurrentUser } from "@/features/user/utils";
import { NavUserDropdown } from "./nav-user-dropdown";

export const NavUser = async () => {
  const user = await getCurrentUser();

  return <NavUserDropdown user={user} />;
};
