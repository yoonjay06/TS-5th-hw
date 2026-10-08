// src/App.tsx
import { useEffect, useState } from 'react';
import { getPosts, createPost, deletePost } from './api/posts';
import PostForm from './components/PostForm';
import type { Async, NewPost, Post } from './types';

function App() {
  const [state, setState] = useState<Async<Post[]>>({ status: 'loading' });

  useEffect(() => {
    getPosts()
      .then((data) => setState({ status: 'success', data }))
      .catch((e) => setState({ status: 'error', message: String(e) }));
  }, []);

  const addPost = async (data: NewPost) => {
    const created = await createPost(data);
    setState((prev) =>
      prev.status === 'success'
        ? { status: 'success', data: [created, ...prev.data] }
        : prev
    );
  };

  // 과제. removePost : 서버에서 삭제가 성공한 뒤에만 filter로 목록에서 빼기
  const removePost = async (id: number) => {
    await deletePost(id); // 요청이 실패하면 여기서 멈춰서 아래 setState까지 안 감 → 목록 그대로
    setState((prev) =>
      prev.status === 'success'
        ? { status: 'success', data: prev.data.filter((post) => post.id !== id) }
        : prev
    );
  };

  if (state.status === 'loading') return <p>불러오는 중...</p>;
  if (state.status === 'error') return <p>에러: {state.message}</p>;

  // 여기서부터 state는 success로 좁혀짐 (왜?? 성공해야 띄울 수 있으니까!!)
  return (
    <div>
      <PostForm onAdd={addPost} />
      {state.data.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button type="button" onClick={() => removePost(post.id)}>
            삭제
          </button>
        </article>
      ))}
    </div>
  );
}

export default App;