import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import VenderDetail from "./pages/VendorDetail";
import Auth from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AddVendor from "./pages/AddVendor";


const RootLayout = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "lists", element: <Listing /> },
      { path: "infoPage", element: <VenderDetail /> },
      { path: "auth", element: <Auth /> },
      { path: "profile", element: <UserDashboard /> },
      { path: "addvendor", element: <AddVendor /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
