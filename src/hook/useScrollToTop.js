import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

export default function useScrollToTop(top = 0, skip = false) {
    console.log("🚀 ~ file useScrollToTop.js:4 ~ useScrollToTop ~ skip:", skip)


    const scrollToTop = () => {
        console.log("🚀 ~ file: useScrollToTop.js:17 ~ scrollToTop ~ scrollToTop:", 'scrollToTop')
        scroll.scrollToTop({
            duration: 500,
            delay: 500,
            smooth: "easeInOutQuart",
        });
    }

    const scrollToPosition = (top) => {
        console.log("🚀 ~ file: useScrollToTop.js:18 ~ scrollToPosition ~ scrollToPosition(" + top + "):", 'scrollToPosition(' + top + ')')
        scroll.scrollTo(top)
    }
    // useEffect(() => {
    //     console.log('ScrollToTop!!!');
    //     scroll.scrollToTop({
    //         duration: 500,
    //         delay: 500,
    //         smooth: "easeInOutQuart",
    //     });
    // }, []);
}
