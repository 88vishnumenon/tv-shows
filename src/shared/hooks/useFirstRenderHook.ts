import { useRef, useEffect } from "react";

const useIsFirstRender = () => {
    const is_first_render = useRef(true);
    console.log("useIsFirstRender rendered");

    useEffect(() => {
        is_first_render.current = false;
        console.log("useIsFirstRender changed to false");
    }, []);
    console.log("useIsFirstRender value returned");
    return is_first_render.current;
};
export default useIsFirstRender;