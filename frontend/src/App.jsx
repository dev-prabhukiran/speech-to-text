import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Demo } from './pages/Demo'
import { Logs } from './pages/Logs'
import { Settings } from './pages/Settings'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Nopage } from './pages/NoPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='flex flex-col items-center gap-6 px-8'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Nopage/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App
