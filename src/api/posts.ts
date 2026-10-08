// 실습 2. getPosts : 게시글 목록 불러오기 (응답 타입 붙이기)
import { api } from './client';
import type { Post, NewPost } from '../types';

export const getPosts = async (): Promise<Post[]> => {
    const res = await api.get<Post[]>('/posts');
    return res.data;
};

// 실습 3. createPost : 게시글 작성하기 (보낼 때 / 받을 때 타입 구분)


export const createPost = async (data: NewPost): Promise<Post> => {
    const res = await api.post<Post>('/posts', data);
    return res.data;
};

// 과제. deletePost : 게시글 삭제하기 (돌려받을 데이터가 없으니 Promise<void>)
export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
};
