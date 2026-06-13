'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import styles from "./Blog.module.css";

interface PaginatedResponse {
  data: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?page=${currentPage}&limit=${pageSize}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data: PaginatedResponse = await response.json();
        setPosts(data.data);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <>
      <section className={styles.section}>
        <h2>Blog</h2>
        
        {loading && <p>Loading posts...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && posts.length === 0 && <p>No posts yet.</p>}
        
        {!loading && posts.length > 0 && (
          <>
            <div className={styles.postsList}>
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postLink}>
                  <article className={styles.postItem}>
                    <h3>{post.title}</h3>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <small>
                      By {post.author || 'Anonymous'} · {new Date(post.created_at).toLocaleDateString()}
                    </small>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  ← Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
