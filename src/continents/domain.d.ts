import {RowDataPacket} from "mysql2";

export type Continent = {
    continentId: number,
    name: string,
    imageUrl: string,
}

export type ContinentDb = RowDataPacket & {
    continent_id: number,
    name: string,
    image_url: string,
}
