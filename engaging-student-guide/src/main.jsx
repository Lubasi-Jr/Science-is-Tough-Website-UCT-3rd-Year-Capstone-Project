import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import RecentActivityContextProvider from "./context/contextRecentActivity";
import AuthProvider from "./hooks/useAuth";
import PointsContextProvider from "./context/PointsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <PointsContextProvider>
      <RecentActivityContextProvider>
          <RouterProvider router={router} />
      </RecentActivityContextProvider>
    </PointsContextProvider>
    </AuthProvider>
  </StrictMode>
);
