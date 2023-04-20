import { RoutesProps } from "@/config/router";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

interface SpecialLayoutProps {
  routes: RoutesProps[];
}

const SpecialLayout: React.FC<SpecialLayoutProps> = ({ routes }) => (
  <Suspense fallback={<>loading</>}>
    <Routes>
      {routes?.map(({ path, element: Element }, index) => (
        <Route
          key={`Route${index.toString()}`}
          path={path}
          element={<Element />}
        />
      ))}
    </Routes>
  </Suspense>
);

export default SpecialLayout;
