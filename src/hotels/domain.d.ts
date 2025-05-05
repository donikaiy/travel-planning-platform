import {RowDataPacket} from "mysql2";

export type Hotel = {
    hotelId: number,
    galleryId: number,
    cityId: number,
    name: string,
    location: string,
    about: string,
    price: number,
    preferredGalleryEntryId: number
}

export type HotelDb = RowDataPacket & {
    hotel_id: number,
    gallery_id: number,
    city_id: number,
    name: string,
    location: string,
    about: string,
    price: number,
    preferred_gallery_entry_id: number
}
