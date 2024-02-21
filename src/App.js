import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" index element={<Form />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
