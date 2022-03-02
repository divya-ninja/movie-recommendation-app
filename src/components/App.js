import '../styles/App.css';
import Signup from './Signup';
import Navbar from './Navbar';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './Login';
import Home from './Home';
import history from '../history';

function App() {
  return (
    <BrowserRouter history={history}>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>   
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
