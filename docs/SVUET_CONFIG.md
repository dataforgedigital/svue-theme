## `svuet.config.js`

```typescript
  export default {
    store: 'shopify-store',
    build: {
      prefix: 'svuet',
      outdir: 'assets',
      javascript: {
        input: 'resources/main.ts',
        output: 'script.js',
        useLiquid: true,
        alias: {
          "@": 'resources',
        },
      },
      styles: {
        useLiquid: true,
        input: {
          'index': 'resources/styles/main.scss',
          'product': 'resources/styles/main2.scss',
        },
        alias: {
          "@styles": 'resources/styles',
        },
      }
    }
  };
```
