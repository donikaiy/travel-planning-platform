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
        }

        return hotel
    });
}

const getHotelById = async (hotelId: number): Promise<Hotel[]> => {
    const [result] = await connection.query<HotelDB[]>('SELECT * FROM hotels WHERE hotel_id = ?', [hotelId]);
    return result.map(hotelDB => {
        const hotel: Hotel = {
            hotelId: hotelDB.hotel_id,
            galleryId: hotelDB.gallery_id,
            cityId: hotelDB.city_id,
            name: hotelDB.name,
            location: hotelDB.location,
            about: hotelDB.about,
            price: hotelDB.price,
        }

        return hotel
    })
}

export default {getAllHotels, getHotelById}

