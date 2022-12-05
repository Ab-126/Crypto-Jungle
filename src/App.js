import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CoinPage from "./components/CoinPage";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Alert from './components/Alert'

import './styles/header.css'
import './styles/banner.css'
import './styles/carousel.css'
import './styles/coinsTable.css'
import './styles/CoinPage.css'
import './styles/coinInfo.css'


function App() {
  return (
    <BrowserRouter>
      <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
