import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import States from './components/States';
import StateDetails from './components/StateDetails';
import Packages from './components/Packages';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/states" element={<States />} />
        <Route path="/state/:id" element={<StateDetails />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
