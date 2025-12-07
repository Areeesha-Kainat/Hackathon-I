# Data Model for Humanoid Robotics Book Content

This "data model" describes the hierarchical and structural organization of the book's content within the Docusaurus framework. It outlines the entities, their attributes, and relationships, focusing on how the Markdown files will be structured and linked.

## Entities

### 1. Book

-   **Description**: The overarching container for all content.
-   **Attributes**:
    -   `Title`: "Physical AI & Humanoid Robotics Book"
    -   `Author`: (TBD)
    -   `Version`: (Semantic versioning, e.g., 1.0.0)
    -   `Publication_Date`: (Date of final publication)
-   **Relationships**: Contains `Modules`, `Introduction`, `Hardware Architecture`, `Appendices`.

### 2. Introduction (intro.md)

-   **Description**: The introductory section of the book.
-   **Attributes**:
    -   `Title`: "Introduction"
    -   `Content`: Text, diagrams, overview of the book's scope and objectives.
-   **Relationships**: Part of `Book`.

### 3. Hardware Architecture (hardware-architecture.md)

-   **Description**: A dedicated section detailing hardware references.
-   **Attributes**:
    -   `Title`: "Hardware Architecture"
    -   `Content`: Descriptions of workstations, Jetson Edge kits, sensors, robots.
-   **Relationships**: Part of `Book`.

### 4. Module

-   **Description**: A major thematic section of the book.
-   **Attributes**:
    -   `Name`: (e.g., "Module 1: The Robotic Nervous System (ROS 2)")
    -   `Number`: (1, 2, 3, 4)
    -   `Overview`: High-level summary of the module's content.
-   **Relationships**: Contains `Chapters`.

### 5. Chapter

-   **Description**: A sub-section within a `Module`, covering a specific topic.
-   **Attributes**:
    -   `Title`: (e.g., "Module 1 - Chapter 1: ROS 2 Fundamentals")
    -   `Filename`: (e.g., `module1-chapter1.md`)
    -   `Content`: Overview, key concepts, use cases, technical explanations, code samples, diagrams, summary.
    -   `Word_Count`: (800-1500 words, validated)
-   **Relationships**: Belongs to a `Module`.

### 6. Appendices (appendices.md)

-   **Description**: Supplementary material at the end of the book.
-   **Attributes**:
    -   `Title`: "Appendices"
    -   `Content`: Glossary, further reading, etc.
-   **Relationships**: Part of `Book`.

## Structural Relationships (File System & Docusaurus)

The physical file structure directly mirrors the logical structure, leveraging Docusaurus's conventions for sidebar generation.

```
docs_temp/
├── intro.md
├── hardware-architecture.md
├── module-1/
│   ├── module1-chapter1.md
│   ├── module1-chapter2.md
│   ├── ...
├── module-2/
│   ├── module2-chapter1.md
│   ├── ...
├── module-3/
│   ├── module3-chapter1.md
│   ├── ...
├── module-4/
│   ├── module4-chapter1.md
│   ├── ...
└── appendices.md
```

-   Each `.md` file represents a `Chapter`, `Introduction`, `Hardware Architecture`, or `Appendices`.
-   Directories like `module-1/` represent `Modules`.
-   Docusaurus's `_category_.json` files (not explicitly modeled here but implied for Docusaurus structure) will define module titles and display order in the sidebar.

## Validation Rules (derived from Requirements and Constitution)

-   **FR-001**: Book MUST be divided into 4 modules, each with 5 chapters. (Total 20 chapter files in module directories)
-   **FR-002**: Each chapter MUST contain specific content sections. (Content structure within each .md file)
-   **FR-003, FR-004**: Tone and style rules apply to all `Content`.
-   **FR-005, FR-006, FR-007, FR-008, FR-009**: Rules for `Content` accuracy, terminology, code samples, AI grounding, and jargon explanation.
-   **FR-010**: `Content` MUST NOT reference external URLs directly.
-   **Constitution Constraints**: Chapter `Word_Count` (800-1500 words), overall book length (min 8-12 chapters, here 20 + intro/appendices).
