import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ManageModules from "./pages/ManageModules";
import CreateModule from "./pages/CreateModule";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/manage-modules" element={<ManageModules />} />
          <Route path="/manage-modules/create" element={<CreateModule />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
