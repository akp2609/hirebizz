import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import { GoogleOAuthProvider } from "@react-oauth/google";

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
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>

    </GoogleOAuthProvider>
  );
}

export default App;
