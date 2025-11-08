# Vodle Color System

This document describes the CSS variable-based color system in Vodle, which has been implemented to prepare for dark theme support.

## Overview

All hardcoded color values in HTML, TypeScript, and SVG files have been replaced with CSS variables. This allows for easy theme switching in the future by modifying the CSS variable values based on the browser's preferred color scheme.

## CSS Variables

All color variables are defined in `src/theme/variables.scss` within the `:root` selector. This makes them available globally throughout the application.

### Available Color Variables

| Variable Name | Light Theme Value | Usage |
|--------------|-------------------|-------|
| `--vodle-red` | `#d33939` | Error states, disapproval indicators |
| `--vodle-blue` | `#3465a4` | Primary color, opposition indicators |
| `--vodle-blue-transparent` | `#3465a4a0` | Semi-transparent blue for overlays |
| `--vodle-green` | `#62a73b` | Success states, approval indicators |
| `--vodle-green-transparent` | `#62a73ba0` | Semi-transparent green for overlays |
| `--vodle-darkgreen` | `#4c822e` | Dark green accent |
| `--vodle-light` | `#bce4e5` | Light teal background, highlights |
| `--vodle-dark` | `#9abcbd` | Dark teal for text and graphics |
| `--vodle-medium` | `#769596` | Medium teal for secondary text |
| `--vodle-grey` | `#808080` | Neutral grey for labels and text |
| `--vodle-border-grey` | `#444444` | Dark grey for borders and lines |
| `--vodle-tint` | `#b4dbdb` | Tint color for buttons and accents |
| `--vodle-highlight` | `#88e950` | Bright highlight color |
| `--vodle-background-light` | `#eeeeee` | Light background color |
| `--vodle-white-semi` | `#ffffffd0` | Semi-transparent white |
| `--vodle-white` | `#ffffffff` | Fully opaque white |
| `--vodle-landing-circle` | `#c2e0e0` | Teal color for landing page animations |

## Usage in Code

### HTML/SVG Files

Colors can be used directly in HTML and SVG attributes:

```html
<!-- Fill attribute -->
<rect fill="var(--vodle-light)" />

<!-- Stroke attribute -->
<line stroke="var(--vodle-border-grey)" />

<!-- Text fill -->
<text fill="var(--vodle-blue)">Label</text>
```

### TypeScript Files

In TypeScript, CSS variables should be used as strings:

```typescript
// Setting computed colors
const color = someCondition ? 'var(--vodle-red)' : 'var(--vodle-green)';

// Object with color mappings
const colors = {
  "vodlered": "var(--vodle-red)",
  "vodleblue": "var(--vodle-blue)",
  "vodlegreen": "var(--vodle-green)"
};
```

## Ionic Color Classes

The following Ionic color classes have also been updated to use CSS variables:

- `.ion-color-vodlered`
- `.ion-color-vodleblue`
- `.ion-color-vodlegreen`
- `.ion-color-vodledarkgreen`
- `.ion-color-vodlelight`
- `.ion-color-vodledark`

## Future Dark Theme Implementation

To implement a dark theme in the future, add a media query or class-based selector in `variables.scss`:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --vodle-red: #ff6b6b;           // Lighter red for dark backgrounds
    --vodle-blue: #5c9fd6;          // Lighter blue
    --vodle-green: #7dd87d;         // Lighter green
    --vodle-darkgreen: #6ba357;     // Adjusted dark green
    --vodle-light: #3a5a5c;         // Darker teal for dark theme
    --vodle-dark: #b8d4d6;          // Lighter teal for text
    --vodle-medium: #8fb5b7;        // Adjusted medium teal
    --vodle-grey: #b0b0b0;          // Lighter grey
    --vodle-border-grey: #666666;   // Lighter border grey
    --vodle-tint: #4a7a7c;          // Adjusted tint
    --vodle-highlight: #a8ff70;     // Brighter highlight
    --vodle-background-light: #1a1a1a;  // Dark background
    --vodle-white-semi: #000000c0;  // Semi-transparent dark
    --vodle-white: #000000ff;       // Fully opaque dark
    --vodle-landing-circle: #5a9a9c;  // Adjusted landing circle color
  }
}
```

## Files Modified

The following files were modified to replace hardcoded colors with CSS variables:

### Theme Configuration
- `src/theme/variables.scss` - Added CSS variable definitions

### TypeScript Files
- `src/app/analysis/analysis.page.ts` - Updated `svgcolors` object
- `src/app/explain-approval/explain-approval.page.ts` - Updated computed color logic

### HTML Template Files
- `src/app/explain-approval/explain-approval.page.html`
- `src/app/addoption-dialog/addoption-dialog.page.html`
- `src/app/analysis/analysis.page.html`
- `src/app/delegation-dialog/delegation-dialog.page.html`
- `src/app/draftpoll/draftpoll.page.html`
- `src/app/poll/poll.page.html`
- `src/app/sharedcomponents/expandable/expandable.component.html`

### Landing Page Files
- `src/assets/landing-page/index.html`
- `src/assets/landing-page/index_de.html`

## Testing

After making changes to color variables:

1. Build the application: `npm run build`
2. Test the application in both light and dark modes (if dark mode is implemented)
3. Verify that all UI elements display correctly with the new colors
4. Check that SVG graphics and animations work properly

## Notes

- The landing page files (`index.html` and `index_de.html`) contain additional colors for illustrations that were not changed, as they are specific to the artwork and not part of the application's themable color palette.
- CSS variables are supported in all modern browsers that Vodle targets (Chrome, Firefox, Safari, Edge).
- When CSS variables are used in SVG elements within HTML, they are resolved at runtime, allowing for dynamic theming.
