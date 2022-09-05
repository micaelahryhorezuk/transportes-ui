import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setReduxData } from '../store';

// export interface DialogProps {
//   open: boolean;
//   container?: React.ReactInstance;
//   title?: string;
//   type?: "error" | "warning" | "info" | "success";
//   variant?: "filled";
//   message?: string;
//   buttonCancel: DialogButton;
//   buttonSubmit?: DialogButton;
//   classes?: {
//       container?: string;
//       title?: string;
//       content?: string;
//       actions?: string;
//       component?: string;
//   };
//   component?: React.ReactNode;
//   fontSize?: number;
// }

export function useDialog() {
    const data = useSelector((state) => state.dialog?.data);
    const [info, setInfo] = useState();
  
    useEffect(() => {
        setInfo(data);
    }, [data]);
  
    return info;
}

export const openDialog = (value) => {
    setReduxData('setDialog', value)
}

export const closeDialog = () => {
    setReduxData('setDialog', undefined)
}

// export interface DialogInfo extends Omit<DialogProps, "buttonCancel" | "container" | "open"> {
//     cancelText?: string;
//     onCancelClick?: () => void;
// }
