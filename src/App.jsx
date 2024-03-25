import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign_up from './pages/sign_up';
import Login from './pages/login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Sign_up />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  )
};

export default App;
