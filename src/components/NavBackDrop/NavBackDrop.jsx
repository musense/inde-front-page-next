import React, { useCallback, useEffect, useRef } from 'react';

export default function NavBackDrop({
  active,
  zIndex,
  unCheck,
}) {
  const navBackdropRef = useRef(null);

  const navBackdropHandler = useCallback((e) => {
    e.preventDefault();
    console.log(
      '🚀 ~ file: NavBackDrop.jsx:11 ~ navBackdropHandler ~ e.target:',
      e.target
    );
    unCheck && unCheck(e);
  }, [unCheck]);

  useEffect(() => {
    if (navBackdropRef.current === null) {
      return;
    } else {
      navBackdropRef.current.addEventListener('touchstart', navBackdropHandler);
      navBackdropRef.current.addEventListener('touchend', navBackdropHandler);
      navBackdropRef.current.addEventListener('wheel', navBackdropHandler);
      navBackdropRef.current.addEventListener('scroll', navBackdropHandler);
    }
  }, [navBackdropRef, navBackdropHandler]);

  return (
    <div
      ref={navBackdropRef}
      id='nav-backdrop'
      style={{
        zIndex: zIndex,
        // backgroundColor: 'white',
        // opacity: 0.5,
      }}
      className={`${active ? 'active' : ''}`}
    />
  );
}
