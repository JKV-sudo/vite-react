// convert-images.cjs
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  'src/assets/logo_eye_V2-removebg-preview.png',
  // Add more image paths here if needed
];

images.forEach((imgPath) => {
  const base = imgPath.replace(/\.[^.]+$/, '');
  const webpPath = `${base}.webp`;
  const avifPath = `${base}.avif`;

  sharp(imgPath)
    .webp({ quality: 90 })
    .toFile(webpPath)
    .then(() => console.log(`Converted to WebP: ${webpPath}`))
    .catch((err) => console.error(`WebP conversion failed for ${imgPath}:`, err));

  sharp(imgPath)
    .avif({ quality: 90 })
    .toFile(avifPath)
    .then(() => console.log(`Converted to AVIF: ${avifPath}`))
    .catch((err) => console.error(`AVIF conversion failed for ${imgPath}:`, err));
}); 