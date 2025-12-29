import { generateImages } from './generate-images.js';
import { startScheduler } from './scheduler.js';
import chalk from 'chalk';

console.log(chalk.blue.bold('\n🚀 LinkedIn Visual Post Automation\n'));

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'generate':
      console.log(chalk.yellow('📸 Generating images...'));
      await generateImages();
      break;
    
    case 'schedule':
      console.log(chalk.green('⏰ Starting scheduler...'));
      startScheduler();
      break;
    
    case 'test':
      console.log(chalk.cyan('🧪 Running test generation...'));
      await generateImages();
      console.log(chalk.green('✅ Test complete!'));
      break;
    
    default:
      console.log(chalk.red('❌ Unknown command'));
      console.log('\nAvailable commands:');
      console.log(chalk.cyan('  npm start generate') + ' - Generate all images');
      console.log(chalk.cyan('  npm start schedule') + ' - Start the scheduler');
      console.log(chalk.cyan('  npm start test') + ' - Test image generation');
  }
}

main().catch(err => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});
