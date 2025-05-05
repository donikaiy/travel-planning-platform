import {RowDataPacket} from "mysql2";

export type Room = {
    roomId: number,
    hotelId: number,
    name: string,
    imageUrl: string
}

export type RoomDb = RowDataPacket & {
    room_id: number,
    hotel_id: number,
    name: string,
    image_url: string
}
