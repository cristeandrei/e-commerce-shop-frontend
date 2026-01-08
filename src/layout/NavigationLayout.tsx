import { NavLink } from "react-router";
import { Outlet } from "react-router/internal/react-server-client";
import ThemeSwitcher from "../features/themeSwitcher/ThemeSwitcher";

export default function NavigationLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/login" end>
          Login
        </NavLink>
        <ThemeSwitcher />
      </nav>
      <Outlet />
    </div>
  );
}
