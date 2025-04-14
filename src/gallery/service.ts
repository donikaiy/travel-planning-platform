import galleryRepository from '../gallery/repository'

export const getGalleryImagesByGalleryId = async (galleryId: number) => {
    return galleryRepository.getGalleryImagesByGalleryId(galleryId)
}
