import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  bookSidebar: [ // Renamed from tutorialSidebar to bookSidebar
    'intro', // Assumes intro.md will be directly in docs/
    'hardware-architecture', // Assumes hardware-architecture.md will be directly in docs/
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1/module1-chapter1',
        'module-1/module1-chapter2',
        'module-1/module1-chapter3',
        'module-1/module1-chapter4',
        'module-1/module1-chapter5',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2/module2-chapter1',
        'module-2/module2-chapter2',
        'module-2/module2-chapter3',
        'module-2/module2-chapter4',
        'module-2/module2-chapter5',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
      items: [
        'module-3/module3-chapter1',
        'module-3/module3-chapter2',
        'module-3/module3-chapter3',
        'module-3/module3-chapter4',
        'module-3/module3-chapter5',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'module-4/module4-chapter1',
        'module-4/module4-chapter2',
        'module-4/module4-chapter3',
        'module-4/module4-chapter4',
        'module-4/module4-chapter5',
      ],
    },
    'appendices', // Assumes appendices.md will be directly in docs/
  ],
};

export default sidebars;

