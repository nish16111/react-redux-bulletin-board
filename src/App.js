import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}/>

      <Route index element={<PostsList />} />

      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePostPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;

/*
In summary, when the URL is /post, the AddPostForm is displayed, and when the URL 
is /post/:postId (e.g., /post/123), the SinglePostPage component is shown with the
corresponding post ID.
 */