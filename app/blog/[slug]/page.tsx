import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import styles from './post.module.css';
import { postsService } from '@/lib/posts.service';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  let error: string | null = null;

  try {
    post = postsService.getBySlug(slug);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        <h1>{post.title}</h1>
        
        <div className={styles.meta}>
          <span>By {post.author || 'Anonymous'}</span>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>

        <div className={styles.content}>
          {post.content}
        </div>
      </article>
    </div>
  );
}
