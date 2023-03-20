import { NFTCollection } from './pages/Collection/NFTCollection';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'normalize.css';
import './App.scss';
import { NavBar } from './Components/Nav';
import DefaultLayout from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { My } from './pages/My';
import { Rankings } from './pages/Rankings/Rankings';
import { AssetsDetail } from './pages/Assets';
import { Footer } from './Components/Footer';
import { MyCollection } from './pages/MyCollection';

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/nft-market/'>
        <NavBar />
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/my' element={<My />} />
            <Route path='/my/collection/:address' element={<MyCollection />} />
            <Route path='/rankings' element={<Rankings />} />
            <Route path='/collection/:address' element={<NFTCollection />} />
            <Route
              path='/assets/:address/:tokenId'
              element={<AssetsDetail />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
