import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppRoutes>
        
      </AppRoutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
