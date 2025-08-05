import type { FileSize } from '../types/media'

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG

export function buildImageSrc(size: FileSize, path: string) {
    if (!size || !path) return ''

    return `${BASE_URL}/${size}/${path}`
}
