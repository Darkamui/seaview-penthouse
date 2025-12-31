# Category-Based Filtering in Media Plugin

## ✅ Setup Complete!

All **182 images** (87 gallery + 21 event type + 74 feature) have been successfully tagged with their categories. You can now filter images by category in the Media plugin's grid view!

## 🎯 How to Filter by Category

### Using the Media Plugin:

1. Go to https://seaview.sanity.studio/
2. Click **"Media"** in the left sidebar
3. You'll see all your images in a grid layout

### Filter Options:

**Option 1: Tag Filter (Recommended)**
- Look for the **"Tags"** filter in the left panel
- Click on any category tag:
  - **Gallery Images**: Living Room (Gallery), Balcony (Gallery), Bedrooms (Gallery), Kitchen (Gallery), Bathrooms (Gallery), Around (Gallery), Events (Gallery), Brides (Gallery)
  - **Event Type Images**: Intimate Gatherings (Event), Bridal Preparations (Event), Business Events (Event)
  - **Feature Images**: Living Space (Feature), Bedroom (Feature), Balcony (Feature), Location (Feature)
- The grid will show only images with that tag

**Option 2: Search Bar**
- Type the category name in the search bar (e.g., "balcony")
- The plugin searches through tags, titles, and descriptions

**Option 3: Multi-Select**
- Click multiple category tags to see images from multiple categories
- Example: Select both "Bedrooms" and "Bathrooms" to see all room images

## 🔄 Adding New Images

When you upload new images, they are **automatically tagged** on publish!

### Automatic Tagging (Default):
1. Upload new images through Gallery Images, Event Type Images, or Feature Images
2. Set the category/eventType/feature field
3. Images are automatically tagged - no manual steps needed!

This works for both:
- **Individual uploads**: Images tagged automatically when you click "Publish"
- **Bulk uploads**: Images tagged automatically during the upload process

Tagging format:
- Gallery Images → "Category (Gallery)"
- Event Type Images → "Type (Event)"
- Feature Images → "Category (Feature)"

### Manual Re-sync (If Needed):
If you need to re-tag all images (e.g., after bulk category changes):

```bash
cd sanity-studio
npx sanity exec scripts/syncCategoriesToTags.ts --with-user-token
```

This script will re-tag all 182+ images from all three document types.

## 📊 Current Tag Distribution

Based on the migration of **111 unique assets** (some assets are used in multiple document types):

**Gallery Images (87 total):**
- Living Room (Gallery): ~13 images
- Balcony (Gallery): ~28 images
- Bedrooms (Gallery): ~22 images
- Kitchen (Gallery): ~6 images
- Bathrooms (Gallery): ~8 images
- Around (Gallery): ~4 images
- Events (Gallery): 0 images (tag created, ready to use)
- Brides (Gallery): 0 images (tag created, ready to use)

**Event Type Images (21 total):**
- Intimate Gatherings (Event): ~4 images
- Bridal Preparations (Event): ~14 images
- Business Events (Event): ~3 images

**Feature Images (74 total):**
- Living Space (Feature): ~14 images
- Bedroom (Feature): ~16 images
- Balcony (Feature): ~42 images
- Location (Feature): ~2 images

**Total**: 182 documents sharing 111 unique assets

## 🛠️ Maintenance

### Re-sync All Images
If categories get out of sync, run:
```bash
npx sanity exec scripts/syncCategoriesToTags.ts --with-user-token
```

### Add New Categories
1. Update the appropriate category options:
   - `GALLERY_CATEGORY_OPTIONS` in `schemas/galleryImage.ts`
   - `EVENT_TYPE_OPTIONS` in `schemas/eventTypeImage.ts`
   - `FEATURE_OPTIONS` in `schemas/featureImage.ts`
2. Update corresponding arrays in `scripts/syncCategoriesToTags.ts`
3. Update `getCategoryTitle()` in `actions/autoTagAction.ts`
4. Run the sync script to tag existing images

## 💡 Pro Tips

1. **Bulk Operations**: Select multiple images with the same category and tag them all at once
2. **Tag Management**: You can rename tags in the Media plugin - it will update all tagged assets
3. **Search + Filter**: Combine search with tag filters for powerful queries
4. **Grid vs Table**: Toggle between grid view (large previews) and table view (detailed info)

## 🔍 Technical Details

### How It Works:
- Tags are stored as weak references in `opt.media.tags[]` on each image asset
- **Automatic tagging on publish**: When you publish a document, the `autoTagAction` automatically tags the image asset
- **Manual sync script**: `syncCategoriesToTags.ts` can re-tag all existing images from all three document types
- Each category has a unique `media.tag` document with format: `media-tag-{type}-{value}`
- The Media plugin reads these tags and provides filter UI automatically
- Single assets can have multiple tags (e.g., an image used in both Gallery and Feature documents)

### Tag Document ID Format:
**Gallery Images:**
- `media-tag-gallery-livingRoom` → Living Room (Gallery)
- `media-tag-gallery-balcony` → Balcony (Gallery)
- `media-tag-gallery-bedrooms` → Bedrooms (Gallery)
- etc...

**Event Type Images:**
- `media-tag-event-intimate` → Intimate Gatherings (Event)
- `media-tag-event-bridal` → Bridal Preparations (Event)
- `media-tag-event-business` → Business Events (Event)

**Feature Images:**
- `media-tag-feature-livingSpace` → Living Space (Feature)
- `media-tag-feature-bedroom` → Bedroom (Feature)
- `media-tag-feature-balcony` → Balcony (Feature)
- `media-tag-feature-location` → Location (Feature)

## 📚 Related Documentation

- [Media Plugin Usage](./README-MEDIA-PLUGIN.md)
- [Sanity Plugin Media - GitHub](https://github.com/sanity-io/sanity-plugin-media)
- [Sanity Plugin Media - Docs](https://www.sanity.io/plugins/sanity-plugin-media)

---

**Need Help?** The category filtering is now fully configured and ready to use for all three document types:
- **Gallery Images**: Automatically tagged on publish with "Category (Gallery)"
- **Event Type Images**: Automatically tagged on publish with "Type (Event)"
- **Feature Images**: Automatically tagged on publish with "Category (Feature)"

Just open the Media plugin and start filtering by your category tags! External users can now upload and publish images without needing terminal access - everything is automatic.
