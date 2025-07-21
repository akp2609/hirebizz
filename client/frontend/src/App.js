import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Footer from './components/layout/Footer';
import Home from './pages/common/Home';
import About from './pages/common/About';
import Login from './pages/common/Login';
import SignUp from './pages/common/SignUp';
import NavBar from './components/layout/NavBar';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Setting from "./pages/common/Setting";
import DevPlayground from "./pages/_dev";
import { UserProvider } from "./context/UserContext";
import AdminRoutes from "./components/admin/AdminRoutes";
import Applications from "./pages/employer/Applicantions";
import 'tw-elements';
import VerifyEmail from "./pages/common/VerifyEmail";
import VerifyEmailSent from "./pages/common/VerifyEmailSent";
import { useAuth } from "./context/AuthContext";
import UserProfilePage from "./pages/common/UserProfilePage";
import SavedJobs from "./pages/common/SavedJob";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import MyApplications from "./pages/candidate/MyApplications";



const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};


function App() {
  return (

    <GoogleOAuthProvider clientId={clientId}>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <BrowserRouter>

          <UserProvider>

            <div className="flex-1  shadow-inner">
              <Routes>

                <Route element={<AppLayout />}>
                  <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                  <Route path='/about' element={<PrivateRoute><About /></PrivateRoute>} />

                  <Route path='/setting' element={<PrivateRoute><Setting /></PrivateRoute>} />
                  <Route path='/profile' element={<PrivateRoute><UserProfilePage></UserProfilePage></PrivateRoute>} />
                  <Route path='/admin/*' element={<PrivateRoute><AdminRoutes /></PrivateRoute>} />
                  <Route path='/_dev' element={<PrivateRoute><DevPlayground /></PrivateRoute>} />
                  <Route path='/employer/job/:jobId/applications' element={<PrivateRoute><Applications /></PrivateRoute>} />
                  <Route path="/saved-jobs" element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
                  <Route path="/my-applications" element={<PrivateRoute><MyApplications/></PrivateRoute>}/>
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />

                <Route element={<AuthLayout />}>
                  <Route path="/verify-email/:token" element={<VerifyEmail />} />
                  <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                </Route>
              </Routes>
            </div>
          </UserProvider>

        </BrowserRouter>
      </div>


    </GoogleOAuthProvider>
  );
}

export default App;
