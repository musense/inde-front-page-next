import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import debounce from '@services/debounce'
export default function useShowHeader() {
    const headerForceHide = () => {
        console.log('!!!!!!!!!!!!headerForceHide scroll start!!!!!!!!!!!!');
        forceHideRef.current = true
        setShowHeader(false)
    }
    const headerRestore = () => {
        console.log('!!!!!!!!!!!!headerRestore scroll end!!!!!!!!!!!!');
        forceHideRef.current = false
    }
 
    const forceHideRef = useRef(false);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', debounce(headerRestore))
    }, [])

    useScrollPosition(({ prevPos, currPos }) => {
        // console.group("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ useScrollPosition")
        // console.log("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ currPos:", currPos.y)
        console.log("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ prevPos:", prevPos.y)
        // console.log("🚀 ~ file: useShowHeader.jsx:48 ~ useScrollPosition ~ forceHideRef.current:", forceHideRef.current)
        // console.groupEnd("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ useScrollPosition")

        if (forceHideRef.current) return
        if (clientWindowWidth < 768 && -prevPos.y < 100) return
        const isShow = currPos.y > prevPos.y
        // console.log("🚀 ~ file: useShowHeader.jsx:47 ~ useScrollPosition ~ isShow:", isShow)
        // console.log("🚀 ~ file: useShowHeader.jsx:49 ~ useScrollPosition ~ showHeader:", showHeader)
        if (isShow !== showHeader) setShowHeader(isShow);
    },
        [showHeader],
        false,
        false,
        100
    );

    return [showHeader, headerForceHide]
}
