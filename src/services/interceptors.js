import { useToast } from 'vue-toastification'

const toast = useToast();

export const successInterceptor = response => response;

export const errorInterceptor = error => {
  if (!error.response) toast.error("No internet connection!")
  else if (error.response.status === 500) toast.error('Somesing went wrong!')

  error.response.data = error.response.data.data

  return Promise.reject(error)
}
