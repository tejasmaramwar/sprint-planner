import { toast } from "react-toastify";

export const handleSuccess = (m) => {
    toast.success(m, {
        position: 'top-right'
    })
}

export const handleError = (m) => {
    toast.error(m, {
        position: 'top-right'
    })
}