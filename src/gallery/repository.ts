import {Gallery, GalleryDB} from "./gallery";
import {connection} from "../repository";

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

export default {getGalleryImagesByGalleryId}
