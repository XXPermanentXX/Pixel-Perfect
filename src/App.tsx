import { Route, Routes } from "react-router-dom";
import GeneratePage from "./pages/generate";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<GeneratePage />} />
    </Routes>
  );
}

export default App;
