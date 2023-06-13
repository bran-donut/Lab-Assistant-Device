import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ManageModules from "./pages/ManageModules";
import CreateModule from "./pages/CreateModule";
import EnrolStudents from "./pages/EnrolStudents";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/manage-modules" element={<ManageModules />} />
          <Route path="/manage-modules/create" element={<CreateModule />} />
          <Route path="/manage-modules/enrol-students" element={<EnrolStudents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
