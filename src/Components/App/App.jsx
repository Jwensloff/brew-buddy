import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import AgeCheck from '../AgeCheck/AgeCheck'


function App() {
  return (
    <div className="App">
      <AgeCheck />
      <header className='mainHeader'>
        <Search/>
      </header>

      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
