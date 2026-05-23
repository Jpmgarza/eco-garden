const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = [
  __dirname,
  path.join(__dirname, 'image'),
];

async function convertDir(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const src = path.join(dir, file);
    const base = path.join(dir, path.basename(file, path.extname(file)));
    const webp = base + '.webp';
    const avif = base + '.avif';

    if (!fs.existsSync(webp)) {
      await sharp(src).webp({ quality: 85 }).toFile(webp);
      console.log('WebP:', path.relative(__dirname, webp));
    }
    if (!fs.existsSync(avif)) {
      await sharp(src).avif({ quality: 60 }).toFile(avif);
      console.log('AVIF:', path.relative(__dirname, avif));
    }
  }
}

(async () => {
  for (const dir of dirs) await convertDir(dir);
  console.log('Done.');
})();
