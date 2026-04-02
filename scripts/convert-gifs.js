const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sequenceDir = path.join(__dirname, '../../'); // c:\Users\itkhy\Downloads\sequence\
const outputDir = path.join(__dirname, '../public/sequence/'); // c:\Users\itkhy\Downloads\sequence\portfolio-app\public\sequence\

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertGifs() {
  console.log('Starting conversion from GIF to WebP...');
  
  // Read raw gif directory
  const files = fs.readdirSync(sequenceDir)
    .filter(file => file.endsWith('.gif') && file.startsWith('frame_'))
    .sort();

  if (files.length === 0) {
    console.log('No GIF sequences found in parent directory.');
    return;
  }

  console.log(`Found ${files.length} GIF frames. Processing...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(sequenceDir, file);
    
    // We expect filenames like frame_000_delay-0.041s.gif
    // We will simply rename them cleanly: frame_000.webp
    // Extract the frame number dynamically 
    const match = file.match(/frame_(\d+)/);
    const frameNum = match ? match[1] : i.toString().padStart(3, '0');
    
    const outputPath = path.join(outputDir, `frame_${frameNum}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 }) // High performance WebP compression
        .toFile(outputPath);
      process.stdout.write(`\rConverted ${i + 1}/${files.length} frames`);
    } catch (err) {
      console.error(`\nError converting ${file}:`, err);
    }
  }

  console.log('\nConversion complete! Assets are ready in public/sequence/.');
}

convertGifs();
