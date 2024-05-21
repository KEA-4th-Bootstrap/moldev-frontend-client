import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MoldevPage from './pages/MoldevPage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path=":moldevId/:postId" element={<PostPage />} />
        </Route>
        <Route path="/write" element={<WritePage />} />
        <Route path="/:moldevId" element={<MoldevPage />}>
          <Route path=":postId" element={<PostPage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
