import {RowDataPacket} from "mysql2";

export type Gallery = {
    galleryEntry: number,
    galleryId: number,
    imageUrl: string,
}

export type GalleryDb = RowDataPacket & {
    gallery_entry: number,
    gallery_id: number,
    image_url: string,
}
