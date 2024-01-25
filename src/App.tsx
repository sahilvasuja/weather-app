
import './App.css'
import { Signin } from './components/Signin';
import Weather from './Weather';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
      <div >
        <Routes>
        <Route path="/" element={ <Signin />} />
        <Route path="/Weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
