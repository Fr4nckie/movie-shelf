import axios from 'axios'
import type { MediaType, PaginatedResponse, TimeWindow } from '../types/media'
import { api } from './api'

export const getTrendingMedia = async (
    mediaType: MediaType,
    timeWindow: TimeWindow,
    page?: number
): Promise<PaginatedResponse> => {
    try {
        const response = await api.get(`trending/${mediaType}/${timeWindow}`, {
            params: { page }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status
            const message =
                error.response?.data?.status_message || error.message

            console.error(
                `API error [${status}] while fetching ${mediaType}: ${message}`
            )

            throw new Error(
                `Erreur lors du chargement de ${mediaType}: ${message}`
            )
        }

        console.error('Unexpected error', error)
        throw new Error('Erreur inattendue lors de la récupération des données')
    }
}
