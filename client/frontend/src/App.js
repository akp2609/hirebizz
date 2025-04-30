import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Setting from "./pages/Setting";


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
  return (

    <GoogleOAuthProvider clientId={clientId}>
     
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-700">
        <BrowserRouter>
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
            
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>  
     

    </GoogleOAuthProvider>
  );
}

export default App;
