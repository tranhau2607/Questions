import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home'
import Header from './components/header';
import Footer from './components/footer';
import About from './pages/user/About'
import Login from './auth/Login';
import Register from './auth/Register';
function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

      </Routes>
    <Footer/>
    </>
  );
}

export default App;
