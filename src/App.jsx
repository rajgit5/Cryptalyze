import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import CoinDetails from "./Components/CoinDetails";
import About from "./Components/Company/About";
import Contact from "./Components/Company/Contact";
import Privacy from "./Components/Company/Privacy";
import Term from "./Components/Company/Term";
import Login from "./Components/Auth/Login";
import Forgot from "./Components/Auth/Forgot";
import Signup from "./Components/Auth/Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<CoinDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term" element={<Term />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
