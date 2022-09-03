import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import ContactoPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import StaffPage from './pages/StaffPage';
import NoveltyPage from './pages/NoveltyPage';
import ServicePage from './pages/ServicePage';
import ApplicationBar from './components/layout/ApplicationBar';

function App() {
  return (
    <BrowserRouter>
      <ApplicationBar/>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home"/>}/>
        <Route path="/home"  element={<HomePage/>} />
        <Route path="/novetly"  element={<NoveltyPage/>} />
        <Route path="/service"  element={<ServicePage/>} />
        <Route path="/staff"  element={<StaffPage/>} />
        <Route path="/contact"  element={<ContactoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
