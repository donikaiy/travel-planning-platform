import {RowDataPacket} from "mysql2";

export type HotelService = {
    hotelServiceId: number,
    hotelId: number,
    text: string
}

export type HotelServiceDb = RowDataPacket & {
    hotel_service_id: number,
    hotel_id: number,
    text: string
}
