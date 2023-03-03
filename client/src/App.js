import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToDo from "./pages/ToDo";
import Add from "./pages/Add";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todo" element={<ToDo />} />
      <Route path="/add" element={<Add />} />
    </Routes>
  );
}

export default App;
