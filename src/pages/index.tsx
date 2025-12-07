import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>Physical AI & Humanoid Robotics</h1>
        <p>A comprehensive guide to physical AI, humanoid robotics, and advanced AI systems</p>
        <Link className={styles.tutorialBadge} to="/docs/intro">
  Docusaurus Tutorial - 5 min
</Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="A comprehensive guide to physical AI, humanoid robotics, and advanced AI systems">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
