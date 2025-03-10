import {RowDataPacket} from "mysql2";

export type HotelService = {
    hotelId: number,
    serviceId: number,
}

export type HotelServiceDB = RowDataPacket & {
    hotel_id: number,
    service_id: number,
}
