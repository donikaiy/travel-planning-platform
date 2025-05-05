import {connection} from "../repository";
import {HotelService, HotelServiceDB} from "./domain";

const getAllServicesByHotelId = async (hotelId: number): Promise<HotelService[]> => {
    const [results] = await connection.execute<HotelServiceDB[]>(`SELECT * FROM hotel_services WHERE hotel_id = ?`, [hotelId]);

    return results.map(hotelServiceDB => {
        const hotelService: HotelService = {
            hotelServiceId: hotelServiceDB.hotel_service_id,
            hotelId: hotelServiceDB.hotel_id,
            text: hotelServiceDB.text,
        }

        return hotelService
    })
}

export default {getAllServicesByHotelId}
