import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Profile from "../components/Profile/Profile";

const publicRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Profile />,
  },
]);

//export
export default publicRouter;
