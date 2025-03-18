import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./containers/landing/Landing";
import BgAnimation from "./components/BgAnimation";

function App() {
  return (
    <>
      <BgAnimation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
