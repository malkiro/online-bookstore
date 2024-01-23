import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import Profile from './pages/Profile';
import Layout from './utils/Layout';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ViewBook from './pages/ViewBook/ViewBook';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import CategorySingle from './pages/CategorySingle/CategorySingle';
import AllBooks from './pages/AllBooks/AllBooks';
import WishList from './pages/WishList/WishList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />

              <Route path="/all-categories" element={<CategoryPage />} />
              <Route path="/books/:id" element={<CategorySingle />} />

              <Route path="/books" element={<AllBooks />} />
              <Route path="/books/:id/:id/:id" element={<ViewBook />} />
              
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
