import React, { useEffect, useRef } from 'react'
import styles from './decoBackground.module.css'
import { cx, css } from '@emotion/css'

export default function DecoBackground({ repeat, position, offset = '-240px' }) {

  const  decoBackgroundFixed = useRef(null)
  const preventDefault = (e) => e.preventDefault();

  useEffect(() => {
    decoBackgroundFixed.current = document.getElementById("deco-background-fixed");
    if (decoBackgroundFixed.current === null) {
      return
    } else {
      console.log("🚀 ~ file: App.jsx:23 ~ decoBackgroundFixed.addEventListener ~ decoBackgroundFixed:", decoBackgroundFixed)
      decoBackgroundFixed.current.addEventListener('touchstart', preventDefault, false)
      decoBackgroundFixed.current.addEventListener('touchmove', preventDefault, false)
      decoBackgroundFixed.current.addEventListener('touchend', preventDefault, false)
    }
    const ref = decoBackgroundFixed.current

    return () => {
      ref.removeEventListener('touchstart', preventDefault, false)
      ref.removeEventListener('touchmove', preventDefault, false)
      ref.removeEventListener('touchend', preventDefault, false)
    }
  }, [decoBackgroundFixed]);
  const cls1 = css`--category-background-offset:${offset}`
  return <div id="deco-background-fixed" className={cx(cls1, styles['deco-background'], styles[repeat], styles[position],)} />;
}
