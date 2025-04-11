import {RowDataPacket} from "mysql2";

export type City = {
    cityId: number,
    countryId: number,
    name: string,
    imageUrl: string,
}

export type CityDB = RowDataPacket & {
    city_id: number,
    country_id: number,
    name: string,
    image_url: string,
}
