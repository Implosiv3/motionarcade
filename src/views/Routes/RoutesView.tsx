// RoutesPage.tsx

import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

export default function RoutesView() {
  return (
    <div>
      <h1>Available Routes</h1>

      <ul>
        {routes.map(route => (
          <li key={route.path}>
            <Link to={route.path}>
              {route.name} ({route.path})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}