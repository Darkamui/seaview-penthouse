// Load gallery images list server side
import fs from "fs";
import path from "path";

export interface GalleryImage {
  src: string;
  alt: string;
}

const CATEGORY_FOLDER_MAP: Record<string, string> = {
  livingRoom: "living-room",
  balcony: "balcony",
  bedrooms: "bedrooms",
  kitchen: "kitchen",
  bathrooms: "bathrooms",
  around: "around",
};

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export function getGalleryImages(
  categoryId: string,
  categoryName: string
): GalleryImage[] {
  const folderName = CATEGORY_FOLDER_MAP[categoryId];

  if (!folderName) {
    return [];
  }

  const imagesDir = path.join(process.cwd(), "public", "images", folderName);

  try {
    const files = fs.readdirSync(imagesDir);

    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .sort()
      .map((file, index) => ({
        src: `/images/${folderName}/${file}`,
        alt: `${categoryName} ${index + 1}`,
      }));

    return imageFiles;
  } catch (error) {
    console.error(`Error reading directory ${imagesDir}:`, error);
    return [];
  }
}

export function getAllGalleryImages(
  categories: Array<{ id: string; name: string }>
): Record<string, GalleryImage[]> {
  const result: Record<string, GalleryImage[]> = {};

  categories.forEach((category) => {
    if (category.id !== "video") {
      result[category.id] = getGalleryImages(category.id, category.name);
    }
  });

  return result;
}
