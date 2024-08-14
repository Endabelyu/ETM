import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./components/organism/baseLayout.tsx";
import Home from "./pages/home.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Workspace from "./pages/worskspace.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <BaseLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "workspace", element: <Workspace /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
