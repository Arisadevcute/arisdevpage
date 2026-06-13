import { NextRequest, NextResponse } from 'next/server';
import { postsService } from '@/lib/posts.service';
import { validationService } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('limit') || '5', 10);

    // If pagination params are provided, return paginated results
    if (searchParams.has('page') || searchParams.has('limit')) {
      const result = postsService.getPaginatedPublished(page, pageSize);
      return NextResponse.json(result);
    }

    // Otherwise return all posts
    const posts = postsService.getAllPublished();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validationService.validateCreatePost(body);
    if (!validation.valid) {
      return NextResponse.json(
        { errors: validation.errors },
        { status: 400 }
      );
    }

    // Create post
    const post = postsService.create(validation.data!);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/posts error:', error);
    const message = error.message || 'Failed to create post';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
