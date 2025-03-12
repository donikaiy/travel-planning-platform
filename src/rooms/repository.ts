import {connection} from "../repository";
import {Room, RoomDB} from "./domain";
import {placeholderSingle} from "../utils/database";

const getAllRoomsByHotelId = async (hotelId: number): Promise<Room[]> => {
    const [results] = await connection.execute<RoomDB[]>(`SELECT * FROM rooms WHERE hotel_id = (${placeholderSingle})`, [hotelId]);
    return results.map(roomDB => {
        const room: Room = {
            roomId: roomDB.room_id,
            hotelId: roomDB.hotel_id,
            name: roomDB.name,
            imageUrl: roomDB.image_url
        }

        return room
    })
}

export default {getAllRoomsByHotelId}
