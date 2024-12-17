import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import ProductView from './components/ProductView/ProductView';
import paths from './routes/paths';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path={paths.home} element={<ProductList />} />
          <Route path={paths.productView} element={<ProductView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
