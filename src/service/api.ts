import { api } from '@/utils/env'
import axios from 'axios'

export interface APIResponse<T> {
  result: {
    code: number
    message: string
    data: T
  }
}

export const publicApi = axios.create({
  baseURL: api()
})
