import { CreatePostInput } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationService {
  validateCreatePost(data: unknown): { valid: boolean; errors?: ValidationError[]; data?: CreatePostInput } {
    const errors: ValidationError[] = [];

    if (!data || typeof data !== 'object') {
      return { valid: false, errors: [{ field: 'root', message: 'Invalid request body' }] };
    }

    const obj = data as Record<string, unknown>;

    // Title validation
    if (!obj.title || typeof obj.title !== 'string') {
      errors.push({ field: 'title', message: 'Title is required and must be a string' });
    } else if (obj.title.length < 3 || obj.title.length > 200) {
      errors.push({ field: 'title', message: 'Title must be between 3 and 200 characters' });
    }

    // Slug validation
    if (!obj.slug || typeof obj.slug !== 'string') {
      errors.push({ field: 'slug', message: 'Slug is required and must be a string' });
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(obj.slug)) {
      errors.push({ field: 'slug', message: 'Slug must contain only lowercase letters, numbers, and hyphens' });
    }

    // Content validation
    if (!obj.content || typeof obj.content !== 'string') {
      errors.push({ field: 'content', message: 'Content is required and must be a string' });
    } else if (obj.content.length < 10) {
      errors.push({ field: 'content', message: 'Content must be at least 10 characters' });
    }

    // Excerpt validation (optional)
    if (obj.excerpt && typeof obj.excerpt !== 'string') {
      errors.push({ field: 'excerpt', message: 'Excerpt must be a string' });
    } else if (obj.excerpt && obj.excerpt.length > 500) {
      errors.push({ field: 'excerpt', message: 'Excerpt must not exceed 500 characters' });
    }

    // Author validation (optional)
    if (obj.author && typeof obj.author !== 'string') {
      errors.push({ field: 'author', message: 'Author must be a string' });
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      data: {
        title: obj.title as string,
        slug: obj.slug as string,
        content: obj.content as string,
        excerpt: obj.excerpt as string | undefined,
        author: obj.author as string | undefined,
      },
    };
  }
}

export const validationService = new ValidationService();
