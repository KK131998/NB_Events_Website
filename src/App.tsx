
import { Routes, Route } from 'react-router-dom'
import Startseite from "./pages/startseite"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/startseite" element={<Startseite />} />
        <Route path="*" element={<Startseite />} />
      </Routes>
    </div>
  );
}

export default App
