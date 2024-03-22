import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign_up from './pages/sign_up';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Sign_up />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;
