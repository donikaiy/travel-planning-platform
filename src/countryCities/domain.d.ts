import {RowDataPacket} from "mysql2";

export type CountryCity = {
    cityId: number,
    countryId: number,
}

export type CountryCityDB = RowDataPacket & {
    city_id: number,
    country_id: number,
}
