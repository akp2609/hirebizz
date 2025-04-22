import logo from './logo.svg';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';


function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
