import React, { Suspense } from "react";
import { Navigation } from "@/components";
import { Route, Routes } from "react-router-dom";
import { RoutesProps } from "@/config/router";

interface BaseLayoutProps {
  routes: RoutesProps[];
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ routes }) => (
  <>
    <Navigation />
    <div className="App lg:w-screenlg xl:w-screenxl 2xl:w-screen2xl">
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
    </div>
  </>
);

export default BaseLayout;
