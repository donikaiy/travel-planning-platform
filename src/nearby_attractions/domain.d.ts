import {RowDataPacket} from "mysql2";

export type NearbyAttraction = {
    attractionId: number,
    hotelId: number,
}

export type NearbyAttractionDB = RowDataPacket & {
    attraction_id: number,
    hotel_id: number,
}
