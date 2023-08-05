// Page routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// State management
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "./state";

// Styling
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// Pages
import Layout from "./scenes/layout/index";
import Login from "./scenes/login/index";
import Profile from "./scenes/profile/index";
import Document from "./scenes/document/index";
import Rides from "./scenes/ride/index";
import Vehicle from "./scenes/vehicle/index";
import Home from "./scenes/home/index";
import ResetPassword from "./scenes/reset/ResetPassword";
import ConfirmReset from "./scenes/reset/ConfirmReset";
import NewPassword from "./scenes/create-password/NewPassword";
import EnterPassword from "./scenes/create-password/EnterPassword";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errorMessage);
  const success = useSelector((state) => state.auth.successMessage);

  const errorMsg = (err) => {
    toast.error(err, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(setErrorMessage({}));
  };

  const successMsg = (scs) => {
    toast.success(scs, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(setSuccessMessage({}));
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="toast-container position-fixed bottom-0 start-0 p-3">
        {Object.values(errors).map((err) => {
          return errorMsg(err);
        })}
        {Object.values(success).map((scs) => {
          return successMsg(scs);
        })}
      </div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={!isAuth ? <Home /> : <Navigate to="/profile" />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={isAuth ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/my documents"
                element={isAuth ? <Document /> : <Navigate to="/login" />}
              />
              <Route
                path="/my rides"
                element={isAuth ? <Rides /> : <Navigate to="/login" />}
              />
              <Route
                path="/vehicles"
                element={isAuth ? <Vehicle /> : <Navigate to="/login" />}
              />
              <Route
                path="/reset"
                element={!isAuth ? <ResetPassword /> : <Navigate to="/login" />}
              />
              <Route path="/confirm" element={<ConfirmReset />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/enter-password" element={<EnterPassword />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
