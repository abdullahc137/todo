import './App.css';
import Homepage from './components/Homepage';
import Welcome from './components/Welcome';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {
  return (
    <div className="app">
      <Router>
      <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
