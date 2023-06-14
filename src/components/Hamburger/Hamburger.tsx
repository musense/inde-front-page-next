import React from 'react'
import styles from './hamburger.module.css'

type HamburgerProps = {
    zIndex: number;
    unCheck: () => void;
}
const Hamburger = React.forwardRef<HTMLInputElement, HamburgerProps>(function Hamburger({
    zIndex,
    unCheck
},
    ref) {
        
    return (
        <div
            style={{
                zIndex: zIndex,
            }}
                   className = {styles['hamburger']}>
            <input ref       = {ref}
                className={styles['hamburger__input']}
                type="checkbox"
                name="hamburger-check" />
            <span></span>
            <span></span>
            <span></span>
            <button onClick={unCheck} type="button"
                style={{
                    position: 'absolute',
                    display: 'none',
                    right: '10000rem',
                }} />
        </div>
    )
})

export default Hamburger