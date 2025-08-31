# 🛠️ Developer Accelerator Kit

This repository contains the MVP for a Developer Accelerator Kit, designed for the "Software Factory" kata. The goal is not to build a single application, but to create a robust ecosystem of tools and standards that empower front-end teams to build high-quality, consistent products faster.

## Core Philosophy

This project is guided by three principles:

1.  **Standards-Based:** Everything should be built on web standards to ensure long-term stability and interoperability.
2.  **Developer Experience (DX) Focused:** The tools and components should be a joy to use, with clear documentation and smart automation.
3.  **Scalable:** The architecture must support a large organization with many teams and diverse tech stacks.

---



The foundational architecture of the project is now complete. This includes the project structure, tooling, and core technology choices.

### Project Structure

This project is a **monorepo** managed by npm workspaces. This structure allows us to manage multiple, related packages within a single repository.

```
developer-accelerator-kit/
├── packages/
│   ├── components/  # The framework-agnostic UI component library (@c4/components)
│   └── cli/         # (Future) The Node.js CLI for automation and scaffolding
├── README.md
└── package.json
```

### Technology Choices

The technologies for this project were chosen deliberately to meet the goals of a modern Software Factory.

| Technology     | Purpose                | Justification                                                                                                                                                                                                                                   |
| :------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lit**        | Core Component Library | Chosen for building standard, framework-agnostic Web Components. It provides a lightweight, reactive layer on top of native browser APIs, offering an excellent developer experience without sacrificing performance or adherence to standards. |
| **Vite**       | Build & Dev Tooling    | Selected for its incredibly fast development server and optimized build process. It represents the modern standard for front-end tooling.                                                                                                       |
| **TypeScript** | Language               | Ensures type safety and maintainability, which is critical for creating a reliable library that will be used by many developers.                                                                                                                |
| **Monorepo**   | Architecture           | A monorepo is ideal for managing a design system and its associated tooling. It simplifies dependency management and ensures consistency across the entire ecosystem.                                                                           |

---

## Getting Started

To get the component library development server running:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/username/developer-accelerator-kit.git
    cd developer-accelerator-kit
    ```

2.  **Install all dependencies:**
    _(This command will install dependencies for all packages in the monorepo)_

    ```bash
    npm install
    ```

3.  **Run the component library dev server:**
    ```bash
    npm run dev:components
    ```
    This will start the Vite development server for the `@c4/components` package.

## Production Build

The `@c4/components` package is configured for a production build. This process "industrializes" the library, making it a robust, distributable asset ready for publishing to a package registry.

The build is orchestrated by **Vite** and includes the `vite-plugin-dts` plugin to ensure reliability. It generates:

*   **ESM and UMD JavaScript bundles** for maximum compatibility.
*   **Integrated Type Declarations:** The build process automatically generates TypeScript declaration files (`.d.ts`) for every component, ensuring full type-safety and auto-completion for developers using the library.

---
## Components (`@c4/components`)

The core of the accelerator kit is a library of framework-agnostic, accessible, and themeable Web Components.

### `<c4-button>`

A versatile button component with support for multiple visual variants and a disabled state. It is built on top of the native `<button>` element to ensure full accessibility.

**Usage Example:**
```html
<!-- Primary Button -->
<c4-button>Click Me</c4-button>

<!-- Secondary Button -->
<c4-button variant="secondary">Learn More</c4-button>

<!-- Disabled Button -->
<c4-button disabled>Cannot Click</c4-button>
```

### `<c4-card>`
A flexible content container designed to be composed using slots. It supports multiple content patterns, including an optional image header.

**Usage Example:**
```html
<!-- Card with an image passed via property -->
<c4-card image-url="/path/to/image.jpg">
  <h3 slot="title">Card Title</h3>
  <p>This is the main body content for the card.</p>
</c4-card>

<!-- Card with a complex element passed into the 'image' slot -->
<c4-card>
  <picture slot="image">
    <source srcset="..." media="(max-width: 600px)">
    <img src="..." alt="Description">
  </picture>
  <h3 slot="title">Another Title</h3>
  <p>More content here.</p>
</c4-card>
```

### Theming

All components are designed to be easily themed from the outside by overriding their CSS Custom Properties. This allows teams to adapt the components to their specific product's look and feel without changing the component's code.

**Example:**
```css
/* in your application's global stylesheet */
:root {
  --c4-button-primary-bg-color: #ff6f61; /* Change the primary button color */
  --c4-button-border-radius: 99px;    /* Create pill-shaped buttons */
  
  --c4-card-border-radius: 16px;      /* Give cards a larger radius */
  --c4-card-box-shadow: 0 8px 16px rgba(0,0,0,0.12); /* Add a more pronounced shadow */
}
```
## CLI Tooling

This commit introduces the `@c4/cli` package, a Node.js-based command-line tool to automate component creation.

The script uses `@inquirer/prompts` to interactively ask the developer for a component name, and then performs the following actions:
- Validates the name against the design system's naming conventions.
- Creates a new directory for the component in `packages/components/src`.
- Generates the boilerplate `.ts` and `index.ts` files using templates.
- Automatically updates the main `index.ts` of the component library to export the new component.

This tool significantly improves the developer experience (DX) by reducing manual setup, preventing errors, and enforcing consistent code structure, directly supporting the "Software Factory" mission of accelerating development.
## Next Steps

- [x] **Phase 1: Foundation & Setup**
- [x] **Phase 2: Core Component Development** (Build `C4-Button` and `C4-Card`)
- [x] **Phase 3: CLI Tooling** (Develop the Node.js scaffolding script)
