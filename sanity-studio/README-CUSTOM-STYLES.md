# Sanity Studio Custom Image Preview Styles

This configuration enhances the image preview experience in Sanity Studio, making it easier to identify and select images.

## What's Included

The `customStyles.css` file provides **large image previews** in list views, similar to Windows "Very Large Icons" view.

### Current Settings (List View with Large Previews)

- **Image Size**: 120x120px (compared to default ~40px)
- **Item Height**: 120px minimum (provides comfortable spacing)
- **Hover Effects**: Subtle background highlight and shadow
- **Better Spacing**: 8px gap between items for clarity

## Alternative: Grid View

If you prefer a **grid layout** (like a photo gallery), uncomment the grid section at the bottom of `customStyles.css`:

1. Open `sanity-studio/customStyles.css`
2. Find the section marked `/* Grid view alternative - uncomment to enable grid layout instead of list */`
3. Remove the `/*` and `*/` comment markers around that section
4. Save and refresh Sanity Studio

Grid view provides:
- Responsive grid layout (adapts to screen width)
- 200x200px image previews
- Card-style layout with images on top, text below
- Better for visually browsing large image collections

## Customization

You can adjust the sizes in `customStyles.css`:

```css
/* Change list view image size */
[data-ui="Preview"] [data-ui="Flex"]:first-child {
  width: 150px !important;  /* Change from 120px to your preferred size */
  height: 150px !important;
}

/* Change grid view image size (if enabled) */
[data-ui="Preview"] [data-ui="Flex"]:first-child {
  width: 100% !important;
  height: 250px !important;  /* Change from 200px to your preferred size */
}
```

## How It Works

The CSS targets Sanity Studio's internal UI components using data attributes. The styles are:
- Non-intrusive (only affects preview layouts)
- Responsive (works on all screen sizes)
- Theme-aware (supports both light and dark modes)
- Future-proof (uses `!important` to override defaults)

## Troubleshooting

If the styles don't appear:
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Restart the Sanity Studio dev server
3. Hard refresh the page (Ctrl+Shift+R)

If images appear distorted:
- Check `object-fit: cover` is set correctly
- Ensure images have proper aspect ratios
