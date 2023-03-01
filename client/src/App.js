import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToDo from "./pages/ToDo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todo" element={<ToDo />}/>
    </Routes>
  );
}

export default App;
