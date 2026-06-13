import { getDb } from './db';
import { BlogPost, CreatePostInput } from './types';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class PostsService {
  private db = getDb();
  private defaultPageSize = 5;

  getAllPublished(): BlogPost[] {
    try {
      const posts = this.db
        .prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC')
        .all() as BlogPost[];
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  getPaginatedPublished(page: number = 1, pageSize: number = this.defaultPageSize): PaginatedResult<BlogPost> {
    try {
      if (page < 1) page = 1;
      if (pageSize < 1 || pageSize > 100) pageSize = this.defaultPageSize;

      // Get total count
      const countResult = this.db
        .prepare('SELECT COUNT(*) as count FROM posts WHERE published = 1')
        .get() as { count: number };
      const total = countResult.count;

      // Get paginated posts
      const offset = (page - 1) * pageSize;
      const posts = this.db
        .prepare(
          'SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?'
        )
        .all(pageSize, offset) as BlogPost[];

      const totalPages = Math.ceil(total / pageSize);

      return {
        data: posts,
        total,
        page,
        pageSize,
        totalPages,
      };
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  getBySlug(slug: string): BlogPost | null {
    try {
      const post = this.db
        .prepare('SELECT * FROM posts WHERE slug = ? AND published = 1')
        .get(slug) as BlogPost | undefined;
      return post || null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw new Error('Failed to fetch post');
    }
  }

  create(input: CreatePostInput): BlogPost {
    try {
      const { title, slug, content, excerpt, author } = input;

      const stmt = this.db.prepare(`
        INSERT INTO posts (title, slug, content, excerpt, author, published)
        VALUES (?, ?, ?, ?, ?, 1)
      `);

      const result = stmt.run(title, slug, content, excerpt, author);

      return {
        id: Number(result.lastInsertRowid),
        title,
        slug,
        content,
        excerpt,
        author,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Post with this slug already exists');
      }
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  delete(slug: string): void {
    try {
      const stmt = this.db.prepare('DELETE FROM posts WHERE slug = ?');
      stmt.run(slug);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }

  update(slug: string, input: Partial<CreatePostInput>): BlogPost {
    try {
      const post = this.getBySlug(slug);
      if (!post) throw new Error('Post not found');

      const { title, content, excerpt, author } = input;
      const stmt = this.db.prepare(`
        UPDATE posts 
        SET title = ?, content = ?, excerpt = ?, author = ?, updated_at = CURRENT_TIMESTAMP
        WHERE slug = ?
      `);

      stmt.run(title || post.title, content || post.content, excerpt || post.excerpt, author || post.author, slug);

      return { ...post, title: title || post.title, content: content || post.content, excerpt: excerpt || post.excerpt, author: author || post.author };
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }
}

export const postsService = new PostsService();
