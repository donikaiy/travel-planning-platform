import {connection} from "../repository.ts";
import type {Room, RoomDb} from "./domain.d.ts";

const getAllRoomsByHotelId = async (hotelId: number): Promise<Room[]> => {
    const [results] = await connection.execute<RoomDb[]>(`SELECT * FROM rooms WHERE hotel_id = ?`, [hotelId]);

    return results.map(roomDb => {
        const room: Room = {
            roomId: roomDb.room_id,
            hotelId: roomDb.hotel_id,
            name: roomDb.name,
            imageUrl: roomDb.image_url
        }

        return room
    })
}

export default {getAllRoomsByHotelId}
