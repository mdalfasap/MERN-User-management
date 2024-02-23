import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserProfile from "../pages/UserProfile";
import Signin from "../pages/Signin";
import Signup from "../pages/Siginup";
import Add from "../pages/Add";
import Edit from "../pages/Edit"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "sign-in",
        element: <Signin />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "Add",
        element: <Add/>,
      },
      {
        path:"/edit/:id",
        element: <Edit/>,
      },
    ],
  },
]);

export default router;
