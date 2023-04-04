import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout1 from "./components/Layout1";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout1 />}>
        <Route index element={<Home/>} />
      </Route>
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  );
}

export default App;
