import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import { SearchProvider } from "./contexts/SearchContext";
// import PatientProfile from "./pages/PatientProfile";
// import ChangePassword from "./components/patient-profile/ChangePassword";
// import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <>
      <SearchProvider>
        <RouterProvider router={router} />
        {/* <PatientProfile /> */}
        {/* <ChangePassword /> */}
      </SearchProvider>
    </>
  );
}

export default App;
