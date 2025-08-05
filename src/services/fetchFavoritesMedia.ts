import axios from 'axios'
import { api } from './api'

export async function fetchFavoritesMedia(
    mediaType: 'movie' | 'tv',
    id: number
) {
    try {
        const response = await api.get(`/${mediaType}/${id}`)
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
