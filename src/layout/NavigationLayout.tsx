import { NavLink } from "react-router";
import { Outlet } from "react-router/internal/react-server-client";

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
      </nav>
      <Outlet />
    </div>
  );
}
