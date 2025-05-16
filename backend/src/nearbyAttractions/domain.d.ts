import type {RowDataPacket} from "mysql2";

export type NearbyAttraction = {
    attractionId: number,
    hotelId: number,
}

export type NearbyAttractionDb = RowDataPacket & {
    attraction_id: number,
    hotel_id: number,
}
