import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:slug" element={<Play />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
