import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const media = join(process.cwd(), "public", "media");
const output = join(media, "optimized");

const images = [
  { file: "hero-trotteurs.jpg", widths: [640, 960, 1440, 1920] },
  { file: "pathway-donation.jpg", widths: [480, 800, 1200] },
  { file: "pathway-membership.jpg", widths: [480, 800, 1200] },
  { file: "expo.jpg", widths: [384] },
  { file: "pathway-adoption.jpg", widths: [480, 800, 1200] },
  { file: "trotting-horse.png", widths: [192, 384] },
];

await mkdir(output, { recursive: true });

for (const { file, widths } of images) {
  const input = join(media, file);
  const stem = file.replace(/\.[^.]+$/, "");

  for (const width of widths) {
    const resized = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    await Promise.all([
      resized
        .clone()
        .avif({ quality: 85, effort: 6 })
        .toFile(join(output, `${stem}-${width}.avif`)),
      resized
        .clone()
        .webp({ quality: 90, alphaQuality: 100, effort: 6 })
        .toFile(join(output, `${stem}-${width}.webp`)),
    ]);
  }
}

console.log(`Optimized ${images.length} homepage images in ${output}`);
