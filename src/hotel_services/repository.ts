import {connection} from "../repository";
import {HotelService, HotelServiceDB} from "./domain";
import {placeholderSingle} from "../utils/database";

const getAllServicesByHotelId = async (hotelId: number): Promise<HotelService[]> => {
    const [results] = await connection.execute<HotelServiceDB[]>(`SELECT * FROM hotels_services WHERE hotel_id = (${placeholderSingle})`, [hotelId]);
    return results.map(hotelServiceDB => {
        const hotelService: HotelService = {
            hotelId: hotelServiceDB.hotel_id,
            serviceId: hotelServiceDB.service_id,
        }

        return hotelService
    })
}

export default {getAllServicesByHotelId}
