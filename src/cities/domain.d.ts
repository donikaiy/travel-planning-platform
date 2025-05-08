import {RowDataPacket} from "mysql2";
import {Attraction} from "../attractions/domain";

export type City = {
    cityId: number,
    countryId: number,
    name: string,
    imageUrl: string,
}

export type CityDb = RowDataPacket & {
    city_id: number,
    country_id: number,
    name: string,
    image_url: string,
}

export type CityWithExtras = City & {
    attractions?: Attraction[]
}
