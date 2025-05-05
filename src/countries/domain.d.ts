import {RowDataPacket} from "mysql2";

export type Country = {
    countryId: number,
    continentId: number,
    galleryId: number,
    name: string,
    history: string,
}

export type CountryDb = RowDataPacket & {
    country_id: number,
    continent_id: number,
    gallery_id: number,
    name: string,
    history: string,
}
