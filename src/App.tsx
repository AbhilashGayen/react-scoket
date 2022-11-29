import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { SocketContext, ws } from './context/socket';
import { BookmarkPage } from './pages/bookmarkPage';
import { TokenDetailPage } from './pages/tokenDetailPage';

function App() {
  return (
    <>
      <Header />
      <SocketContext.Provider value={ws}>
        <Routes>
          <Route path="/" element={<BookmarkPage />} />
          <Route path="tokenDetail/:isin" element={<TokenDetailPage />} />
        </Routes>
      </SocketContext.Provider>
    </>
  );
}

export default App;
