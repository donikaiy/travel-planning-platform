import {City} from "@/types/city";
import {Cuisine} from "@/types/cuisine";
import {Gallery} from "@/types/gallery";

export type Country = {
    countryId: number,
    continentId: number,
    galleryId: number,
    name: string,
    history: string
}

export type CountryWithCities = Country & {
    cities: City[]
}

export type CountryById = CountryWithCities & {
    gallery: Gallery[],
    cuisines: Cuisine[]
}
