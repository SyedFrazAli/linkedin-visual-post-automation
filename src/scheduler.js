const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const notifier = require('node-notifier');

const postsPath = path.join(__dirname, '../content/posts.json');

function getNextPost() {
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  
  // Find the next post that is ready (status === 'ready')
  const nextPost = posts.find(post => post.status === 'ready');
  
  return nextPost;
}

function sendReminder(post) {
  console.log('\n🔔 POST REMINDER!');
  console.log('━'.repeat(50));
  console.log(`📝 Title: ${post.title}`);
  console.log(`👤 Author: ${post.author}`);
  console.log(`🖼️  Image: ${post.imagePath}`);
  console.log('━'.repeat(50));
  console.log('⏰ Time to post on LinkedIn!\n');
  
  // Desktop notification
  notifier.notify({
    title: 'LinkedIn Post Reminder',
    message: `Time to post: ${post.title}`,
    sound: true,
    wait: true
  });
  
  // Update post status to 'scheduled'
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  const postIndex = posts.findIndex(p => p.id === post.id);
  if (postIndex !== -1) {
    posts[postIndex].status = 'scheduled';
    posts[postIndex].scheduledAt = new Date().toISOString();
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  }
}

function startScheduler() {
  console.log('🚀 LinkedIn Post Scheduler Started');
  console.log(`⏰ Schedule: ${process.env.POST_SCHEDULE || '0 9 * * 1,3,5'}`);
  
  // Check for posts every minute (you can adjust the schedule)
  cron.schedule(process.env.POST_SCHEDULE || '0 9 * * 1,3,5', () => {
    const nextPost = getNextPost();
    
    if (nextPost) {
      sendReminder(nextPost);
    } else {
      console.log('📭 No posts scheduled for today');
    }
  });
  
  console.log('✅ Scheduler is running. Press Ctrl+C to stop.\n');
}

module.exports = { startScheduler, getNextPost, sendReminder };
