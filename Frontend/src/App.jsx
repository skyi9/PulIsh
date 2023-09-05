import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import LandingPage from "./Components/Home/LandingPage/LandingPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFoundPage from "./Components/Layouts/NotFoundPage/NotFoundPage";
import { useEffect } from "react";
import Loader from "./Components/Layouts/Loader/Loader";
import { loadUser } from "./redux/actions /authAction";
import { clearError, clearMessage } from "./redux/slices/authSlice";
import Profile from "./Components/User/Profile/Profile";
import ForgetPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword/ResetPassword";

function App() {
  const { isAuth, loading, error, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message, { position: "top-center" });
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error, { position: "top-center" });
      dispatch(clearError());
    }
  }, [message, error, dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add routes those are accessible when user is "logged In", but not accessible when "user is not logged In" here */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuth}
                authRouteRedirect={"/login"}
              />
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Add routes those are accessible when user is "not logged In", but not accessible when "user is logged In" here */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={!isAuth}
                authRouteRedirect={"/profile"}
              />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
            <Route
              path="/resetpassword/:resetToken"
              element={<ResetPassword />}
            />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
