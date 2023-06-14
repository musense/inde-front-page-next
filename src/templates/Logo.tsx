import React, { useEffect, useState } from 'react';
import styles from './logo.module.css';
import Link from 'next/link';

export default function Logo({
  active,
  zIndex,
}: {
  active: boolean;
  zIndex: number;
}) {
  const [prevState, setPrevState] = useState(true);
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setPrevState(active);
      }, 500);
    }
  }, [active]);
  return prevState ? (
    <Link
      href={'/'}
      target='_self'
      style={{
        zIndex: zIndex,
      }}
      className={styles['navbar-logo']}
    ></Link>
  ) : (
    <div
      style={{
        zIndex: zIndex,
        cursor: 'default',
      }}
      className={styles['navbar-logo']}
    ></div>
  );
}
