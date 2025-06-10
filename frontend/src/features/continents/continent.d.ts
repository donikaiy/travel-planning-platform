import {Country} from "../countries/country"

export type Continent = {
    continentId: number,
    name: string,
    imageUrl: string,
    countries: Country[]
}
