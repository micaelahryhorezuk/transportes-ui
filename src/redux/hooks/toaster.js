import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setReduxData } from '../store';

export function useToaster() {
    const data = useSelector((state) => state.toaster?.data);
    const [info, setInfo] = useState();
  
    useEffect(() => {
        setInfo(data);
    }, [data]);
  
    return info;
}

export const openToaster = (value) => {
    if (!value) return;
    if (!value.type) value.type = "error";
    setReduxData('setToaster', value);
}

export const closeToaster = () => {
    setReduxData('setToaster', undefined);
}

// export interface ToasterInfo extends Omit<ToasterProps, "open" | "onClose"> {}
