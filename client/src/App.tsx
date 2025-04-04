import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./containers/landing/Landing";
import BgAnimation from "./components/BgAnimation";
import Home from "./containers/home/Home";

export default function App() {
  return (
    <>
      <BgAnimation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
