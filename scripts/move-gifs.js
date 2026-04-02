const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '../../'); // c:\Users\itkhy\Downloads\sequence\
const outputDir = path.join(__dirname, '../public/sequence/'); // c:\Users\itkhy\Downloads\sequence\portfolio-app\public\sequence\

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let count = 0;
const files = fs.readdirSync(sequenceDir)
  .filter(file => file.endsWith('.gif') && file.startsWith('frame_'));

for (const file of files) {
  const oldPath = path.join(sequenceDir, file);
  // Remove the `_delay-0.041s` part to match what ScrollyCanvas expects (e.g. frame_000.gif)
  const newName = file.replace(/_delay-[a-zA-Z0-9.]+/, '');
  const newPath = path.join(outputDir, newName);
  
  fs.renameSync(oldPath, newPath);
  count++;
}

// Also move package-lock.json to portfolio-app root
const lockPath = path.join(sequenceDir, 'package-lock.json');
const destLockPath = path.join(__dirname, '../package-lock.json');
if (fs.existsSync(lockPath)) {
  fs.renameSync(lockPath, destLockPath);
  console.log('Moved package-lock.json to portfolio-app directory.');
}

console.log(`Successfully moved and renamed ${count} GIF frames to public/sequence/!`);
