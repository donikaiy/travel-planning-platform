import {Gallery, GalleryDB} from "./gallery";
import {connection} from "../repository";
import {placeholderIds} from "../utils/database";

const getGalleryImagesByGalleryId = async (galleryId: number): Promise<Gallery[]> => {
    const [results] = await connection.execute<GalleryDB[]>('SELECT * FROM gallery WHERE gallery_id = ?', [galleryId]);

    return results.map(galleryDB => {
        const gallery: Gallery = {
            galleryEntry: galleryDB.gallery_entry,
            galleryId: galleryDB.gallery_id,
            imageUrl: galleryDB.image_url
        }

        return gallery;
    })
}

const getAllGalleryImagesByGalleryEntries = async (galleryEntries: number[]): Promise<Gallery[]> => {
    const [results] = await connection.execute<GalleryDB[]>(`SELECT * FROM gallery WHERE gallery_entry IN (${placeholderIds(galleryEntries)})`, galleryEntries)

    return results.map(galleryDB => {
        const gallery: Gallery = {
            galleryEntry: galleryDB.gallery_entry,
            galleryId: galleryDB.gallery_id,
            imageUrl: galleryDB.image_url
        }

        return gallery;
    })
}

export default {getGalleryImagesByGalleryId, getAllGalleryImagesByGalleryEntries}
