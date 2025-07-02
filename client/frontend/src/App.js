import { BrowserRouter, Routes, Route } from "react-router-dom";
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


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
  return (

    <GoogleOAuthProvider clientId={clientId}>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-700">
        <BrowserRouter>

          <UserProvider>
            <div className="border-1 border-white">
              <NavBar />
            </div>
            <div className="flex-1">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/setting' element={<Setting />} />
                <Route path='/admin/*' element={<AdminRoutes />} />
                <Route path='/_dev' element={<DevPlayground />} />
              </Routes>
            </div>
            <Footer />
          </UserProvider>

        </BrowserRouter>
      </div>


    </GoogleOAuthProvider>
  );
}

export default App;
