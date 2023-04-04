import { MutableRefObject, useEffect } from "react";

const useClickOutside = (cb:()=>void, ref:MutableRefObject<HTMLElement | null>):void=>{
    
    useEffect(() => {
        const eventFn = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as any)) {
                cb()
            }
        }

        window.addEventListener("click", eventFn);
        return () => {
            window.removeEventListener("click", eventFn);
        }
    }, [cb, ref])
}

export default useClickOutside;