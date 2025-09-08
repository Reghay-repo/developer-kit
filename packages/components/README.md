# @osmrgh/components

A set of framework-agnostic, themeable, and accessible Web Components for the Carrefour Design System, built with Lit.

This package is part of the "Developer Accelerator Kit" project. For information on the full project, including the CLI tooling, please visit the [main project repository](https://github.com/Reghay-repo/developer-kit).

---

## Installation

```bash
npm install @osmrgh/components
```

## Usage

To use the components, you must first import the library in your application's main entry point (e.g., `main.ts`, `index.js`). This one-time import registers all the components with the browser.

```javascript
// In your main.js or main.ts
import '@osmrgh/components';
```

After this, you can use the component tags anywhere in your HTML or templates.

### Framework Integration

#### For Vue.js

To ensure Vue's compiler recognizes these tags, you must update your `vite.config.ts` (or equivalent) to mark them as custom elements.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // All tags starting with 'c4-' will be treated as custom elements
          isCustomElement: (tag) => tag.startsWith('c4-')
        }
      }
    })
  ],
})
```

#### For React

React works with Web Components out of the box for most attributes. For complex data types, a wrapper component may be beneficial.

---

## Available Components

### `<c4-button>`

A versatile button component.

**Usage:**
```html
<c4-button>Click Me</c4-button>
<c4-button variant="secondary">Secondary</c4-button>
<c4-button disabled>Disabled</c4-button>
```

### `<c4-card>`

A flexible content container using slots.

**Usage:**
```html
<c4-card image-url="/path/to/image.jpg">
  <h3 slot="title">Card Title</h3>
  <p>This is the main body content for the card.</p>
</c4-card>
```

---

## Theming

All components can be styled from your global CSS by overriding the provided CSS Custom Properties.

**Example:**

```css
:root {
  --c4-button-primary-bg-color: #ff6f61;
  --c4-button-border-radius: 99px;
  --c4-card-border-radius: 16px;
}
```


