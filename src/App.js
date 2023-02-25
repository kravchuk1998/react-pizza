import React, {useState}  from 'react';
import {Routes, Route} from 'react-router-dom'

import Header from './component/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';
/* import pizzas from './assets/pizza.json' */

  

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      
        <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
        
          <div className="container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue}/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
              
          </div>
      
    </div>
  );
}

export default App;
