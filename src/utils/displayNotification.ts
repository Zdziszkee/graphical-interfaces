import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

export const displaySuccessNotification = (message: string) => {
    toast.success(message, {
        ...toastConfig
    });
}


export const displayErrorNotification = (message: string) => {
    toast.error(message, {
        ...toastConfig
    });
}