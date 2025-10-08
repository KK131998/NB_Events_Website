
import { Routes, Route } from 'react-router-dom'
import Startseite from "./pages/startseite"
import Impressum from "./pages/impressum"
import Datenschutz from "./pages/datenschutz"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/startseite" element={<Startseite />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<Startseite />} />
      </Routes>
    </div>
  );
}

export default App
