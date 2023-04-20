import React, { lazy } from "react";

export interface RoutesProps {
  path: string;
  element: React.LazyExoticComponent<React.FC>;
}

export const ExcludeRouters = ["/login"];

const routes = [
  {
    path: "/login",
    element: lazy(() => import("@/pages/Login")),
  },
  {
    path: "/about",
    element: lazy(() => import("@/pages/About")),
  },
  {
    path: "/home",
    element: lazy(() => import("@/pages/Home")),
  },
];

export default routes;
