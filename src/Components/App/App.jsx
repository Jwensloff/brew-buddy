import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import { useState } from 'react';

function App() {
  const [breweries, setBreweries] = useState([]);

  return (
    <div className='App'>
      <header className='mainHeader'>
        <Search setBreweries={setBreweries} />
      </header>

      <Routes>
        <Route path='/' element={<Homepage breweries={breweries} />} />
      </Routes>
    </div>
  );
}

export default App;
