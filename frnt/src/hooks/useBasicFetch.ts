import { Dispatch, SetStateAction, useEffect } from "react";
import { basicApi } from "../api/api";
import { CanceledError } from "axios";

type props<T> = {
    url:string,
    setData: Dispatch<SetStateAction<T>>
}

export default function useBasicFetch<T> ({url, setData}:props<T>){

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await basicApi.get(url, {
                    signal: controller.signal
                });
                isMounted && setData(response.data);
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
    }, [url, setData])
}