import {RowDataPacket} from "mysql2";

export type Cuisine = {
    cuisineId: number,
    countryId: number,
    text: string,
}

export type CuisineDb = RowDataPacket & {
    cuisine_id: number,
    country_id: number,
    text: string,
}
