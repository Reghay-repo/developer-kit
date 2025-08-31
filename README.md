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

## Next Steps

- [x] **Phase 1: Foundation & Setup**
- [ ] **Phase 2: Core Component Development** (Build `C4-Button` and `C4-Card`)
- [ ] **Phase 3: CLI Tooling** (Develop the Node.js scaffolding script)
