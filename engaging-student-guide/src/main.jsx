import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import FavContextProvider from "./context/favouriteContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavContextProvider>
      <RouterProvider router={router} />
    </FavContextProvider>
  </StrictMode>
);
