import {connection} from "../repository.ts";
import type {HotelService, HotelServiceDb} from "./domain.d.ts";

const getAllServicesByHotelId = async (hotelId: number): Promise<HotelService[]> => {
    const [results] = await connection.execute<HotelServiceDb[]>(`SELECT * FROM hotel_services WHERE hotel_id = ?`, [hotelId]);

    return results.map(hotelServiceDb => {
        const hotelService: HotelService = {
            hotelServiceId: hotelServiceDb.hotel_service_id,
            hotelId: hotelServiceDb.hotel_id,
            text: hotelServiceDb.text,
        }

        return hotelService
    })
}

export default {getAllServicesByHotelId}
