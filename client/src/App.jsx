import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";

const Home = lazy(() => import("./pages/Home"));
const Listing = lazy(() => import("./pages/Listing"));
const BusinessDetail = lazy(() => import("./pages/BusinessesDetail"));
const Auth = lazy(() => import("./pages/Login"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AddBusiness = lazy(() => import("./pages/AddBusiness"));
const UserBusinesses = lazy(() => import("./pages/UserBusinesses"));

const RootLayout = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <ScrollRestoration />
      <Toaster position="top-center" dir="rtl" richColors />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: ":category",
        element: <Listing />,
      },

      {
        path: "businesses/:uniqName",
        element: <BusinessDetail />,
      },

      {
        path: "auth",
        element: <Auth />,
      },

      {
        path: "profile",
        element: <UserDashboard />,
      },

      {
        path: "profile/businesses",
        element: <UserBusinesses />,
      },

      {
        path: "add-business",
        element: <AddBusiness />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
