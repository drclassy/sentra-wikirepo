import { Routes, Route } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage';
import ViewerPage from './pages/ViewerPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticlePage />} />
      <Route path="/viewer" element={<ViewerPage />} />
      <Route path="/viewer/:docId" element={<ViewerPage />} />
    </Routes>
  );
}
