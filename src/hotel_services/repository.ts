import {connection} from "../repository";
import {HotelService, HotelServiceDB} from "./domain";

const getAllServicesByHotelId = async (hotelId: number): Promise<HotelService[]> => {
    const [results] = await connection.query<HotelServiceDB[]>(`SELECT * FROM hotels_services WHERE hotel_id = ?`, [hotelId]);
    return results.map(hotelServiceDB => {
        const hotelService: HotelService = {
            hotelId: hotelServiceDB.hotel_id,
            serviceId: hotelServiceDB.service_id,
        }

        return hotelService
    })
}

export default {getAllServicesByHotelId}
