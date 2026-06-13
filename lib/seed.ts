import { getDb } from './db';

export function addSamplePost() {
  try {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO posts (title, slug, content, excerpt, author, published)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    stmt.run(
      'Welcome to My Blog',
      'welcome-to-my-blog',
      'This is the first blog post! You can add more posts using the API or by running this script.',
      'My first blog post',
      'Aris'
    );

    console.log('✓ Sample post added successfully!');
  } catch (error: any) {
    if (!error.message.includes('UNIQUE constraint failed')) {
      console.error('Error adding sample post:', error);
    }
  }
}

// Run if executed directly
if (require.main === module) {
  addSamplePost();
  process.exit(0);
}
