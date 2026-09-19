import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import BusinessDetail from "./pages/BusinessesDetail";
import Auth from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AddBusiness from "./pages/AddBusiness";
import { UserBusinesses } from "./pages/UserBusinesses";

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
      { path: ":uniqName", element: <BusinessDetail /> },
      { path: "auth", element: <Auth /> },
      { path: "profile", element: <UserDashboard /> },
      { path: "profile/businesses", element: <UserBusinesses /> },
      { path: "add-business", element: <AddBusiness /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
