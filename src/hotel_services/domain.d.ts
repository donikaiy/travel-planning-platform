import {RowDataPacket} from "mysql2";

export type HotelService = {
    hotelServiceId: number,
    hotelId: number,
    text: string
}

export type HotelServiceDB = RowDataPacket & {
    hotel_service_id: number,
    hotel_id: number,
    text: string
}
