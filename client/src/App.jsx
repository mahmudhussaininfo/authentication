import { RouterProvider } from "react-router-dom";
import publicRouter from "./routes/publicRoutes";

function App() {
  return (
    <>
      <RouterProvider router={publicRouter} />
    </>
  );
}

export default App;
