import React, { useEffect } from "react";

export default function useInitial({
    state,
    dispatch,
    path = null,
    category = null
}) {

    useEffect(() => {
        if (!path) return;
        dispatch({
            type: 'SET_PATHNAME',
            payload: {
                lastPathname: localStorage.getItem("prevPath"),
                pathname: localStorage.getItem("currentPath"),
            },
        });
    }, [path, dispatch, state.pathname]);

    useEffect(() => {
        if (state.clientWidth === 0) {
            dispatch({
                type: 'SET_WINDOW_SIZE',
                payload: {
                    width: window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth,
                    height: window.innerHeight ||
                        document.documentElement.clientHeight ||
                        document.body.clientHeight,
                },
            });
        }
    }, [dispatch, state.clientWidth]);

    useEffect(() => {
        if (!category) return
        dispatch({
            type: 'SET_CATEGORY_NAME',
            payload: {
                categoryName: category
            }
        })
    }, [category, dispatch]);
}
