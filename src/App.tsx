import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MoldevPage from './pages/MoldevPage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import EditPage from './pages/EditPage';

function App() {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname === '/write') {
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path=":moldevId/:postId" element={<PostPage />} />
        </Route>
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:postId" element={<EditPage />} />
        <Route path="/:moldevId" element={<MoldevPage />}>
          <Route path=":postId" element={<PostPage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
