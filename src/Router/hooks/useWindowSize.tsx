import { useState, useEffect } from "react";

export type WindowT = {
    width: number;
    height: number;
};

export default function useWindowSize() {
    let [windowSize, setWindowSize] = useState<WindowT>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}
