// One-off generator for public/og-default.png (1200x630) from the site
// portrait. Re-run when content/ gets a new portrait:
//   node scripts/make-og.mjs
import sharp from 'sharp';

const source = 'content/Neon Cat Lover’s Cyberpunk Lounge.png';

await sharp(source)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-default.png');

console.log('make-og — public/og-default.png written');
