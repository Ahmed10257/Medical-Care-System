import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <PatientProfile />
    </>
  );
}

export default App;
