import type {Gallery, GalleryDb} from "./domain.d.ts";
import {connection} from "../repository.ts";
import {placeholderIds} from "../utils/database.ts";

const getGalleryImagesByGalleryId = async (galleryId: number): Promise<Gallery[]> => {
    const [results] = await connection.execute<GalleryDb[]>('SELECT * FROM gallery WHERE gallery_id = ?', [galleryId]);

    return results.map(galleryDb => {
        const gallery: Gallery = {
            galleryEntry: galleryDb.gallery_entry,
            galleryId: galleryDb.gallery_id,
            imageUrl: galleryDb.image_url
        }

        return gallery;
    })
}

const getAllGalleryImagesByGalleryEntries = async (galleryEntries: number[]): Promise<Gallery[]> => {
    const [results] = await connection.execute<GalleryDb[]>(`SELECT * FROM gallery WHERE gallery_entry IN (${placeholderIds(galleryEntries)})`, galleryEntries)

    return results.map(galleryDb => {
        const gallery: Gallery = {
            galleryEntry: galleryDb.gallery_entry,
            galleryId: galleryDb.gallery_id,
            imageUrl: galleryDb.image_url
        }

        return gallery;
    })
}

export default {getGalleryImagesByGalleryId, getAllGalleryImagesByGalleryEntries}
