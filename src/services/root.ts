import axios from 'axios'
import { VITE_API_V3_URL } from '@/config'
import { errorInterceptor, successInterceptor } from './interceptors'

import type { Country } from '@/stores/root'

const request = axios.create({ baseURL: VITE_API_V3_URL })
request.interceptors.response.use(successInterceptor, errorInterceptor)

export default {
  getAllCountries: () => request.get<Country[]>('/all'),
}
