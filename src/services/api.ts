import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

if (!BASE_URL || !API_KEY)
    throw new Error(
        'The environment variables VITE_BASE_URL and VITE_API_KEY must be defined.'
    )

interface ApiConfig extends AxiosRequestConfig {
    baseURL: string
    headers: {
        accept: string
        Authorization: string
    }
}

const config: ApiConfig = {
    baseURL: BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

export const api = axios.create(config)
