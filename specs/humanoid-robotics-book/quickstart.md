# Quickstart Guide: Humanoid Robotics Book Project

This quickstart guide provides instructions for setting up your environment and getting started with contributing to or viewing the "Physical AI & Humanoid Robotics Book."

## 1. Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18.x or higher. Required for Docusaurus.
-   **npm** or **Yarn**: Package manager for JavaScript. npm comes with Node.js.
-   **Git**: Version control system.
-   **Python 3.x**: For running and validating code examples (ROS 2, Isaac, VLA).
-   **PowerShell** (Windows) or **Bash** (Linux/macOS): For running automation scripts.

## 2. Project Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-org/humanoid-robotics-book.git
    cd humanoid-robotics-book
    ```
    *(Replace `https://github.com/your-org/humanoid-robotics-book.git` with the actual repository URL)*

2.  **Install Docusaurus Dependencies**:
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Local Development Server**:
    Start the Docusaurus development server to view the book locally.
    ```bash
    npm run start
    # OR
    yarn start
    ```
    This will open the book in your web browser at `http://localhost:3000`. Any changes you make to the Markdown files will be automatically reloaded.

## 3. Contributing Content

Book content is located in the `docs_temp/` directory.

-   **Chapters**: Organized by module (e.g., `docs_temp/module-1/module1-chapter1.md`).
-   **Introduction/Appendices**: `docs_temp/intro.md`, `docs_temp/appendices.md`, etc.

**Workflow**:

1.  Create a new feature branch for your contributions:
    ```bash
    git checkout -b feature/your-chapter-contribution
    ```
2.  Edit or create Markdown files (`.md` or `.mdx`) in the `docs_temp/` directory.
3.  Ensure your content adheres to the project's [Constitution](.specify/memory/constitution.md) and [Feature Specification](specs/humanoid-robotics-book/spec.md).
4.  Validate code examples as per the testing strategy.
5.  Commit your changes and push to your branch.
6.  Open a Pull Request to the `main` branch.

## 4. Building for Deployment

To generate a static build of the book, which can be deployed to GitHub Pages:

```bash
npm run build
# OR
yarn build
```
The static files will be generated in the `build/` directory.

## 5. Scripting and Automation

This project uses Spec-Kit Plus for workflow automation. Useful scripts are located in the `.specify/scripts/powershell/` directory.

-   `setup-plan.ps1`: Initializes planning documents.
-   `update-agent-context.ps1`: Updates the AI agent's context.

Refer to the respective script files for usage details.