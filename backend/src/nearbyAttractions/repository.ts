import {connection} from "../repository.ts";
import type {NearbyAttraction, NearbyAttractionDb} from "./domain.d.ts";

const getAllAttractionsByHotelId = async (hotelId: number): Promise<NearbyAttraction[]> => {
    const [results] = await connection.execute<NearbyAttractionDb[]>(`SELECT * FROM nearby_attractions WHERE hotel_id = ?`, [hotelId]);

    return results.map(nearbyAttractionDb => {
        const nearbyAttraction: NearbyAttraction = {
            attractionId: nearbyAttractionDb.attraction_id,
            hotelId: nearbyAttractionDb.hotel_id,
        }

        return nearbyAttraction
    })
}

export default {getAllAttractionsByHotelId}
