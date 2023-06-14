import React, { useEffect, useState } from 'react';
import styles from './logo.module.css';
import Link from 'next/link';
import { useAppContext } from '@store/context';

export default function Logo({ active: a, zIndex }) {
  const { state } = useAppContext();
  const active = state.active
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
      title="back to home"
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
