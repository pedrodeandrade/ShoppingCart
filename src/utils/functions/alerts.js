import { toast } from 'react-toastify'

function showErrorAlert (message) {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: false,
    hideProgressBar: false,
    pauseOnHover: false
  })
}

function showSuccessAlert (message) {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: false,
    hideProgressBar: false,
    pauseOnHover: false
  })
}

export {
  showErrorAlert,
  showSuccessAlert
}
