# 🛠️ Developer Accelerator Kit

This repository contains the MVP for a Developer Accelerator Kit. The goal is not to build a single application, but to create a robust ecosystem of tools and standards that empower front-end teams to build high-quality, consistent products faster.

## Core Philosophy

This project is guided by three principles:

1.  **Standards-Based:** Everything should be built on web standards to ensure long-term stability and interoperability.
2.  **Developer Experience (DX) Focused:** The tools and components should be a joy to use, with clear documentation and smart automation.
3.  **Scalable:** The architecture must support a large organization with many teams and diverse tech stacks.

---

## Packages

This monorepo contains the following packages:

### 📦 `@c4/components`

The core of the accelerator kit is a library of framework-agnostic, accessible, and themeable Web Components.

#### **Available Components**

**`<c4-button>`**
A versatile button component with support for multiple visual variants and a disabled state. It is built on top of the native `<button>` element to ensure full accessibility.

*Usage Example:*
```html
<!-- Primary Button -->
<c4-button>Click Me</c4-button>
<!-- Secondary Button -->
<c4-button variant="secondary">Learn More</c4-button>
<!-- Disabled Button -->
<c4-button disabled>Cannot Click</c4-button>
```

**`<c4-card>`**
A flexible content container designed to be composed using slots. It supports multiple content patterns, including an optional image header.

*Usage Example:*
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





The foundational architecture of the project is now complete. This includes the project structure, tooling, and core technology choices.

## Theming

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


**Theming:**
All components are designed to be themed from the outside by overriding their CSS Custom Properties. This allows teams to adapt the components to their specific product's look and feel without changing the component's code.

An interactive **theming demo** is available to showcase this feature. It includes a light/dark mode switcher that demonstrates how the components instantly adapt. After starting the dev server, you can view it at `/theme-demo.html`.

## `@c4/cli`

A Node.js CLI tool to automate common development tasks and enforce standards.

**Features:**
*   **Component Scaffolding:** Interactively generates the boilerplate for a new component, including the component file, an index for the component, and updates to the main library entry point.
*  **Framework Wrappers:** Optionally generates thin wrapper components for **React (.tsx)** and **Vue (.vue)**. These wrappers provide a more native developer experience by handling prop passing and type inference, making it seamless to integrate the Web Components into a framework-specific project.
*   **AI-Powered Documentation (PoC):** When enabled during scaffolding, the script calls the Google Gemini API to generate a professional JSDoc comment block for the new component, providing a head start on documentation.
This tool significantly improves the developer experience (DX) by reducing manual setup, preventing errors, and enforcing consistent code structure, directly supporting the "Software Factory" mission of accelerating development.
    
#### **AI Feature Setup**

To use the AI documentation feature, you must provide a Google Gemini API key.

1.  Create a file named `.env` in the `packages/cli/` directory.
2.  Add your API key to this file:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
3.  The `.gitignore` file is already configured to keep this file from being committed.

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

## Architecture and Tooling

The technologies for this project were chosen deliberately to meet the goals of a modern Software Factory.

| Technology     | Purpose                | Justification                                                                                                                                                                                                                                   |
| :------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lit**        | Core Component Library | Chosen for building standard, framework-agnostic Web Components. It provides a lightweight, reactive layer on top of native browser APIs, offering an excellent developer experience without sacrificing performance or adherence to standards. |
| **Vite**       | Build & Dev Tooling    | Selected for its incredibly fast development server and optimized build process. It represents the modern standard for front-end tooling.                                                                                                       |
| **TypeScript** | Language               | Ensures type safety and maintainability, which is critical for creating a reliable library that will be used by many developers.                                                                                                                |
| **Monorepo**   | Architecture           | A monorepo is ideal for managing a design system and its associated tooling. It simplifies dependency management and ensures consistency across the entire ecosystem.                                                                           |

---

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

### Production Build

The `@c4/components` package is configured for a production build. This process "industrializes" the library, making it a robust, distributable asset ready for publishing to a package registry.

The build is orchestrated by **Vite** and includes the `vite-plugin-dts` plugin to ensure reliability. It generates:

*   **ESM and UMD JavaScript bundles** for maximum compatibility.
*   **Integrated Type Declarations:** The build process automatically generates TypeScript declaration files (`.d.ts`) for every component, ensuring full type-safety and auto-completion for developers using the library.



---

## Versioning and Release Strategy

A reliable versioning and release strategy is critical for a shared component library to ensure that consuming teams can adopt new versions safely and predictably. This project adheres to a strategy based on **Semantic Versioning** and **Conventional Commits**, enabling an automated release workflow.

### Semantic Versioning (SemVer)

The library's versions will follow the `MAJOR.MINOR.PATCH` format:

| Version | When to Increment | Component Library Example |
| :--- | :--- | :--- |
| **PATCH** | For backward-compatible bug fixes. | Fixing a CSS bug where the `c4-button`'s secondary variant has the wrong text color. |
| **MINOR** | For adding new, backward-compatible functionality. | Adding a new component like `<c4-icon>` or adding a new non-breaking property to an existing component. |
| **MAJOR** | For making incompatible API changes (breaking changes). | Renaming a property (e.g., changing `<c4-button variant="...">` to `<c4-button appearance="...">`). |

### Conventional Commits

All commits to this repository must follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This provides a clear commit history and allows us to automate the release process.

The commit message format is: `<type>(<scope>): <subject>`

**Common Types:**
*   `feat`: A new feature (corresponds to a `MINOR` release).
*   `fix`: A bug fix (corresponds to a `PATCH` release).
*   `docs`: Documentation only changes.
*   `style`: Code style changes (formatting, etc.).
*   `refactor`: A code change that neither fixes a bug nor adds a feature.
*   `test`: Adding missing tests or correcting existing tests.
*   `chore`: Changes to the build process or auxiliary tools.

**Breaking Changes:**
Any commit that introduces a breaking change **must** include a footer starting with `BREAKING CHANGE:`. This automatically triggers a `MAJOR` version release.

**Example Commits:**
```
# A bug fix
fix(card): correct box-shadow on dark theme

# A new feature
feat(button): add new 'icon' property to support leading icons

# A breaking change
refactor(button): rename 'variant' prop to 'appearance'

BREAKING CHANGE: The `variant` property on c4-button has been deprecated and renamed to `appearance` to better align with our design language.
```

### Automated Release Workflow

This strategy enables a fully automated release workflow using a tool like `semantic-release` in a CI/CD pipeline (e.g., GitLab CI, GitHub Actions).

The process would be:
1.  A developer merges a feature branch into `main`.
2.  The CI/CD pipeline triggers, running all tests.
3.  If tests pass, the `semantic-release` tool analyzes the new commit messages since the last release.
4.  It automatically determines the next version number (e.g., `1.2.0` -> `1.3.0` if a `feat` commit is found).
5.  It generates a new `CHANGELOG.md` entry based on the commit messages.
6.  It creates a new Git tag with the new version number.
7.  Finally, it publishes the new version of the `@c4/components` package to the internal npm registry.

 
This automated process removes human error and ensures that releases are predictable, well-documented, and safe.

---

    
## Next Steps

- [x] **Phase 1: Foundation & Setup**
- [x] **Phase 2: Core Component Development** (Build `C4-Button` and `C4-Card`)
- [x] **Phase 3: CLI Tooling** (Develop the Node.js scaffolding script)
- [x] **Bonus: Production Readiness**
- [x] **Bonus: Theming Demo**
- [x] **Bonus: AI Integration, Advanced Scaffolding...**
- [x] **Bonus: Versioning Strategy Documentation**
- [x] **Final Step: Publishing to npm**
