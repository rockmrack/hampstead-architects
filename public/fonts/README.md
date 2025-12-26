# Web Fonts Directory

Add your licensed web font files here:

## Required Fonts

### Suisse Intl (Sans-serif body text)
- `SuisseIntl-Regular.woff2`
- `SuisseIntl-Medium.woff2`

### Editorial New (Serif headings)
- `EditorialNew-Thin.woff2`
- `EditorialNew-Light.woff2`

## Font Licensing

Make sure you have the appropriate licenses for web use. These are commercial fonts:

- **Suisse Intl**: Available from [Swiss Typefaces](https://www.swisstypefaces.com/)
- **Editorial New**: Available from [Commercial Type](https://commercialtype.com/)

## Fallback Fonts

If you don't have licenses for these fonts, update [src/styles/global.css](../../src/styles/global.css) to use free alternatives:

- **Serif Alternative**: Crimson Pro, Lora, or Georgia
- **Sans Alternative**: Inter, Work Sans, or system-ui

## Font Loading

Fonts are preloaded in [BaseLayout.astro](../../src/layouts/BaseLayout.astro) for optimal performance.
