import logo from './logo.svg';
import './App.css';
import { Route,Routes} from 'react-router-dom'
import Home from './pages/user/Home'
import Header from './components/header';
import Footer from './components/footer';
import About from './pages/user/About'
function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
