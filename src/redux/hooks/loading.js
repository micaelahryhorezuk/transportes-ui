import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setReduxData } from '../store';

export function useLoading() {
    const data = useSelector((state) => state.loading?.data);
    const [info, setInfo] = useState();
  
    useEffect(() => {
        setInfo(data);
    }, [data]);
  
    return info;
}

export const openLoading = (value) => {
    setReduxData('setLoading', value);
}

export const closeLoading = () => {
    setReduxData('setLoading', undefined);
}

// export interface LoadingInfo {    
//     message: string;
// }

// export interface LoadingInfo extends Omit<LoadingProps, "open" | "onClose"> {}

