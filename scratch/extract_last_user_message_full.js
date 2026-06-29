const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Elitebook\\.gemini\\antigravity\\brain\\81ae9d47-e68b-49de-85fd-fbb6f83bc774\\.system_generated\\logs\\transcript_full.jsonl';

if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf8');
  const lines = content.split('\n').filter(Boolean);
  
  // Find the last few USER_INPUT steps
  const userMessages = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const step = JSON.parse(lines[i]);
    if (step.type === 'USER_INPUT') {
      userMessages.push(step);
    }
  }
  
  console.log(`Found ${userMessages.length} user inputs in full log. Outputting the most recent one:`);
  if (userMessages.length > 0) {
    console.log(`\n--- USER INPUT 1 (UNTRUNCATED) ---`);
    console.log(userMessages[0].content);
  }
} else {
  console.log('Log file not found at:', logPath);
}
