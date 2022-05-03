import { AuthLayout } from "components/Layout";
import NotFound from "components/NotFound";
import FormPage from "pages/form";
import ListPage from "pages/list";

export const routes = [
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/form",
    element: <FormPage />,
  },
  {
    path: "/list",
    element: <ListPage />,
  },
];
