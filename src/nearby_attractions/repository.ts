import {connection} from "../repository";
import {NearbyAttraction, NearbyAttractionDB} from "./domain";

const getAllAttractionsByHotelId = async (hotelId: number): Promise<NearbyAttraction[]> => {
    const [results] = await connection.query<NearbyAttractionDB[]>(`SELECT * FROM nearby_attractions WHERE hotel_id = ?`, [hotelId]);
    return results.map(nearbyAttractionDB => {
        const nearbyAttraction: NearbyAttraction = {
            attractionId: nearbyAttractionDB.attraction_id,
            hotelId: nearbyAttractionDB.hotel_id,
        }

        return nearbyAttraction
    })
}

export default {getAllAttractionsByHotelId}
