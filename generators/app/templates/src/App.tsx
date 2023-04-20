import React, { memo } from "react";
import routes, { ExcludeRouters } from "@/config/router";
import { useLocation } from "react-router-dom";
import BaseLayout from "@/Layout/BaseLayout";
import SpecialLayout from "@/Layout/SpecialLayout";
import "antd/dist/reset.css";

const App: React.FC = () => {
  const location = useLocation();
  console.log();

  return (
    <div className="h-full w-full">
      {ExcludeRouters?.includes(location?.pathname) ? (
        <SpecialLayout routes={routes} />
      ) : (
        <BaseLayout routes={routes} />
      )}
    </div>
  );
};

export default memo(App);
