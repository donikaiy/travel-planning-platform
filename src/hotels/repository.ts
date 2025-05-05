import {connection} from "../repository";
import {Hotel, HotelDB} from "./domain";

const getAllHotels = async (): Promise<Hotel[]> => {
    const [results] = await connection.query<HotelDB[]>('SELECT * FROM hotels');

    return results.map(hotelDB => {
        const hotel: Hotel = {
            hotelId: hotelDB.hotel_id,
            galleryId: hotelDB.gallery_id,
            cityId: hotelDB.city_id,
            name: hotelDB.name,
            location: hotelDB.location,
            about: hotelDB.about,
            price: hotelDB.price,
            preferredGalleryEntryId: hotelDB.preferred_gallery_entry_id
        }

        return hotel
    });
}

const getHotelById = async (hotelId: number): Promise<Hotel> => {
    const [result] = await connection.execute<HotelDB[]>('SELECT * FROM hotels WHERE hotel_id = ?', [hotelId]);

    if (result.length === 0) {
        throw new Error(`Hotel with id ${hotelId} not found`)
    }

    const hotelDB = result[0]

    return {
        hotelId: hotelDB.hotel_id,
        galleryId: hotelDB.gallery_id,
        cityId: hotelDB.city_id,
        name: hotelDB.name,
        location: hotelDB.location,
        about: hotelDB.about,
        price: hotelDB.price,
        preferredGalleryEntryId: hotelDB.preferred_gallery_entry_id
    }
}

const getHotelsByCityId = async (cityId: number): Promise<Hotel[]> => {
    const [results] = await connection.execute<HotelDB[]>('SELECT * FROM hotels WHERE city_id = ?', [cityId]);

    return results.map(hotelDB => {
        const hotel: Hotel = {
            hotelId: hotelDB.hotel_id,
            galleryId: hotelDB.gallery_id,
            cityId: hotelDB.city_id,
            name: hotelDB.name,
            location: hotelDB.location,
            about: hotelDB.about,
            price: hotelDB.price,
            preferredGalleryEntryId: hotelDB.preferred_gallery_entry_id
        }

        return hotel
    });
}

export default {getAllHotels, getHotelById, getHotelsByCityId}

