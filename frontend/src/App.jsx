import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from './components/Navbar';

// Pages
import SignUpPage from './pages/SignUpPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/signin' element={<SignInPage />}/>
          <Route path='/verifyotp' element={<VerifyOtpPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
