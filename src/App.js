import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContexReducer.js';
import Cart from './screens/Cart.js';
import MyOrder from './screens/MyOrder.js';

function App() {
  return (
    
    <div>
      <CartProvider>
     <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/signup' element ={<Signup/>}/>
      <Route path='/mycart' element ={<Cart/>}/>
      <Route path='/myorders' element ={<MyOrder/>}/>
      
     </Routes>
     </CartProvider>
    </div>
    
  );
}

export default App;
