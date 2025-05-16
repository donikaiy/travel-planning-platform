import type {RowDataPacket} from "mysql2";
import type {City} from "../cities/domain.d.ts";

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

export type CountryWithExtras = Country & {
    cities?: City[]
}
