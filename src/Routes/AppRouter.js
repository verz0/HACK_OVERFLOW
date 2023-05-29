import SignIn from "../Components/Auth/SignIn";
import SignUp from "../Components/Auth/SignUp";
import Authroute from "./Authroute";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import ProtectedRoute from "./ProtectedRoutes";
import Insights from '../Components/Home/insighthome'
import Land from '../Components/Home/landinghome'


const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/Signin"
        element={
          <Authroute>
            <SignIn />
          </Authroute>
        }
      />
      <Route
        path="/SignUp"
        element={
          <Authroute>
            <SignUp />
          </Authroute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Insight"
        element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={
        <Land />
      } />
      
    </Routes>
  );
};

export default AppRouter;
