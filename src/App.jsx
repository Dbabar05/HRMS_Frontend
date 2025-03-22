import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Login from './Components/pages/Login/Login';
import Error from './Components/Error';
import SignIn from './Components/pages/Register/SignIn';
import './App.css';
import Footer from './Components/Footer/Footer';

import Header from './Components/Header/Header';
import Lisitng from './Components/pages/Listing/Lisitng';
import Home from './Components/pages/home/Home';
import DetailProduct from './Components/pages/Detail/DetailProduct';

import CartPage from './Components/pages/Cart/Cart';


function App() {

  return (
    <BrowserRouter>
    
     <Header variant="default"/>

        <Routes>
          
            <Route path="/" element={<Home/>} />
            <Route path="/product/category" element={<Lisitng/>} />
            <Route path="/product/detail/:id" element={<DetailProduct/>} />
            {/* <Route path="/error" element={<Error />} />*/}
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/register" element={<SignIn />} />
            <Route path='/cart' element={<CartPage/>} /> 
          
        </Routes>
     <Footer/>
    </BrowserRouter>
  );
}


export default App;
