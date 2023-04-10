import { useEffect } from "react";
import { basicApi } from "../api/api";
import { CanceledError } from "axios";

export default function useBasicFetch(url:string, cb:(data:any)=>void){

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await basicApi.get(url, {
                    signal: controller.signal
                });
                isMounted && cb(response.data);
            } catch (error) {
                if (error instanceof CanceledError) {
                    return;
                }
                console.log(error);
            }
        }
        getData();
        return () => {
            isMounted = false;
            controller.abort()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])
}