import { useState } from 'react';
import './App.scss';
import { NFTCollection } from './Components/NFTCollection';
import 'normalize.css';

function App() {
  return (
    <div className='App'>
      <NFTCollection />
    </div>
  );
}

export default App;
