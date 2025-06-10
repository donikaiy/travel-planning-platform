export type City = CityCreate & {
    cityId: number,
}

export type CityCreate = {
    countryId: number,
    name: string,
    imageUrl: string,
}

